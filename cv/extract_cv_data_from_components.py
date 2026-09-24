#!/usr/bin/env python3

import os
import re

from cv.replace import MessageKeyConverter


def match_balanced(s: str, start: int, open_ch: str, close_ch: str) -> int:
    """Return the index of the bracket that closes the one at s[start]."""
    depth = 0
    i = start
    while i < len(s):
        c = s[i]
        # skip string literals
        if c in "'\"`":
            quote = c
            i += 1
            while i < len(s) and s[i] != quote:
                if s[i] == "\\":
                    i += 1
                i += 1
        # skip comments
        elif s.startswith("//", i):
            i = s.find("\n", i)
            if i == -1:
                break
        elif s.startswith("/*", i):
            i = s.find("*/", i) + 1
        elif c == open_ch:
            depth += 1
        elif c == close_ch:
            depth -= 1
            if depth == 0:
                return i
        i += 1
    raise ValueError("Unbalanced brackets")


def get_default_export_body(source: str) -> str | None:
    decl = re.search(r"export\s+default\s+(?:async\s+)?function\b", source)
    if not decl:
        return None

    paren_start = source.find("(", decl.end())
    paren_end = match_balanced(source, paren_start, "(", ")")

    brace_start = source.find("{", paren_end)
    brace_end = match_balanced(source, brace_start, "{", "}")

    return source[brace_start + 1 : brace_end]


def main():
    component_dir = os.listdir('components')
    translator_name_and_namespace_regex = r"const (.*) =\s*useTranslations\(\s*([^)]*?)\s*\)"
    data_name_regex = r"const (.*) = addIncrementalIDs"
    data_regex = r"addIncrementalIDs.*?\]\)"

    data_from_components = {}

    for filename in component_dir:
        with open('components/' + filename, 'r') as f:
            file_content = f.read()
            component_content = get_default_export_body(file_content)

            translator_matches = re.findall(translator_name_and_namespace_regex, component_content)
            data_name_matches = re.findall(data_name_regex, component_content)
            data_matches = [m.group(0) for m in re.finditer(data_regex, component_content, re.DOTALL)]

            assert len(data_matches) <= 1, f"More than one data match found in {filename}"

            if not (data_name_matches and data_matches):
                continue

            translators = [{"name": name, "namespace": namespace[1:-1]} for name, namespace in translator_matches]


            pattern = re.compile(
                r"""
                (?P<key>['"`]?[\w$.\-]+['"`]?)   # object key (bare or quoted)
                \s*:\s*
                t\(\s*
                (?P<quote>['"`])                 # opening quote of the argument
                (?P<param>.*?)                   # the parameter, non-greedy
                (?P=quote)                       # matching closing quote
                """,
                re.VERBOSE,
            )

            data_from_components[data_name_matches[0]] = ''.join(MessageKeyConverter(translators).convert(data_matches[0]).split('>')[1::]).lstrip('(').rstrip(')').replace('`', "'")

    export_template = f"""
        export const dataFromComponents = {{
            skills: {data_from_components.get('skills', [])},
            education: {data_from_components.get('educations', [])},
            experience: {data_from_components.get('experiences', [])},
            languages: {data_from_components.get('languages', [])},
            honors: {data_from_components.get('honors', [])},
            projects: {data_from_components.get('projects', [])},
        }}
    """

    this_dir = os.path.dirname(os.path.abspath(__file__))
    os.makedirs((this_dir + "/temporary"), exist_ok=True)
    with open(this_dir + "/temporary/template.ts", 'w') as f:
        f.write('import { toDate } from \'@/utils\'\n\n')
        f.write(export_template)



if __name__ == '__main__':
    main()