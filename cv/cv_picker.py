#!/usr/bin/env python3

import json
import os
import subprocess
from dataclasses import dataclass
from xml.sax.saxutils import escape as xml_escape

RESUME_PATH = "/home/felipe/Documents/GitHub/felipecarvalhos.github.io/cv/json/picker_cv.json"
INDENT = "   "


@dataclass
class Entry:
    display: str            # what's shown in the list (with indentation)
    path: list               # list of keys/indices to reach this node in the JSON
    selectable: bool          # False for headings
    search_key: str = ""     # extra text used for matching (breadcrumb or descendant names)
    is_group: bool = False   # True for a flat dict/list of scalars (e.g. {"en": ..., "pt-br": ...})


def label_for_list_item(item, index: int) -> str:
    """Pick a readable label for an array item: title/name/id if present, else its index."""
    if isinstance(item, dict):
        for key in ("title", "name", "id", "role", "company"):
            if key in item and isinstance(item[key], (str, int, float)):
                return str(item[key])
    return f"[{index}]"


LOCALE_KEYS = {"en", "pt-br"}


def is_locale_group(node) -> bool:
    """True only for a dict that has (at least) both 'en' and 'pt-br' keys --
    i.e. an actual locale-variant object, not just any dict of scalars."""
    return isinstance(node, dict) and LOCALE_KEYS.issubset(node.keys())


def flatten(node, path, depth) -> list[Entry]:
    """
    Walk the JSON tree and produce a flat list of Entry objects in display order.

    - A dict/list that contains further nesting is a heading: shown, not
      selectable, and its children are flattened inline beneath it.
    - A dict/list made entirely of scalars (e.g. locale variants) is instead
      treated as a single selectable "group" entry: picking it opens a small
      follow-up menu with just its members, instead of flattening them inline.
    - A scalar is a normal selectable leaf.
    """
    entries: list[Entry] = []

    if isinstance(node, dict):
        items = node.items()
    elif isinstance(node, list):
        items = [(label_for_list_item(v, i), v) for i, v in enumerate(node)]
    else:
        return entries  # shouldn't be called on a scalar directly

    for i, (key, value) in enumerate(items):
        # real path segment: dict key stays a string; list index must be the int i
        path_segment = key if isinstance(node, dict) else i
        child_path = path + [path_segment]
        indent = INDENT * depth

        if is_locale_group(value):
            # e.g. summary: {en: ..., pt-br: ...} -- selectable, opens a submenu
            member_keys = " ".join(str(k) for k in value.keys())
            entries.append(Entry(
                display=f"{indent}{xml_escape(str(key))}  \u25b8",  # small ▸ hints "opens submenu"
                path=child_path,
                selectable=True,
                search_key=f"{key} {member_keys}".strip(),
                is_group=True,
            ))
        elif isinstance(value, (dict, list)):
            child_entries = flatten(value, child_path, depth + 1)
            descendant_text = " ".join(e.search_key for e in child_entries)
            heading = Entry(
                display=f"{indent}<b>{xml_escape(str(key))}</b>",
                path=child_path,
                selectable=False,
                search_key=f"{key} {descendant_text}".strip(),
            )
            entries.append(heading)
            entries.extend(child_entries)
        else:
            breadcrumb = " ".join(str(p) for p in child_path)
            entries.append(Entry(
                display=f"{indent}{xml_escape(str(key))}",
                path=child_path,
                selectable=True,
                search_key=breadcrumb,
            ))

    return entries


def build_rofi_input(entries: list[Entry]) -> str:
    """
    Rofi's extended dmenu row format:
        display_text\\0meta\\x1f<extra searchable text>\\x1fnonselectable\\x1f<true|false>
    """
    lines = []
    for e in entries:
        nonselectable = "false" if e.selectable else "true"
        row = f"{e.display}\0meta\x1f{e.search_key}\x1fnonselectable\x1f{nonselectable}"
        lines.append(row)
    return "\n".join(lines)


def run_rofi(entries: list[Entry]) -> Entry | None:
    rofi_input = build_rofi_input(entries)
    result = subprocess.run(
        ["rofi", "-dmenu", "-i", "-format", "i", "-p", "Resume", "-normal-window", "-markup-rows"],
        input=rofi_input,
        capture_output=True,
        text=True,
    )
    output = result.stdout.strip()
    if not output.isdigit():
        return None  # Esc pressed, or nothing selected
    index = int(output)
    if 0 <= index < len(entries):
        return entries[index]
    return None


def run_group_picker(group: dict, label: str):
    """Small follow-up popup listing a locale group's variants (e.g. en, pt-br).
    Returns the picked value, or None if cancelled."""
    keys = list(group.keys())
    menu_input = "\n".join(keys)
    result = subprocess.run(
        ["rofi", "-dmenu", "-i", "-p", label, "-normal-window"],
        input=menu_input,
        capture_output=True,
        text=True,
    )
    picked = result.stdout.strip()
    if not picked or picked not in keys:
        return None
    return group[picked]


def get_value(data, path):
    cur = data
    for step in path:
        cur = cur[step]
    return cur


def copy_to_clipboard(value: str):
    if os.environ.get("XDG_SESSION_TYPE") == "wayland":
        subprocess.run(["wl-copy"], input=value, text=True)
    else:
        subprocess.run(["xclip", "-selection", "clipboard"], input=value, text=True)


def main():
    with open(RESUME_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    entries = flatten(data, path=[], depth=0)
    chosen = run_rofi(entries)

    if chosen is None:
        return  # user cancelled
    if not chosen.selectable:
        return  # picked a heading row somehow; ignore

    node = get_value(data, chosen.path)

    if chosen.is_group:
        label = str(chosen.path[-1])
        value = run_group_picker(node, label)
        if value is None:
            return  # cancelled the submenu
    else:
        value = node

    copy_to_clipboard(str(value))
    # subprocess.run(["notify-send", "Copied", str(value)[:80]])


if __name__ == "__main__":
    main()