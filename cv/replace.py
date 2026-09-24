import re


class MessageKeyConverter:
    def _get_pattern(self, translator_name: str) -> re.Pattern:
        return re.compile(
            rf"""
            (?P<head>:\s*)                                  # the colon after the object key
            (?<![\w$.]){re.escape(translator_name)}         # bare translator, not format( or i18n.t(
            (?:\.(?P<function_name>\w+))?                   # optional .raw / .rich / .markup ...
            \(\s*
            (?P<quote>['"`])                                # opening quote
            (?P<param>(?:(?!(?P=quote)).)*)                 # the translation key
            (?P=quote)                                      # matching closing quote
            \s*,?\s*\)                                      # closing paren (allows trailing comma)
            """,
            re.VERBOSE,
        )

    def __init__(self, translators: list, prefix: str = "MESSAGEKEY!"):
        self._translators = translators
        self._prefix = prefix

    def convert(self, text: str) -> str:
        current = text

        for translator in self._translators:
            current = self._get_pattern(translator["name"]).sub(lambda m: self._replace(m, translator["namespace"]), current)

        return current

    def _replace(self, match: re.Match, translator_namespace: str) -> str:
        param = match.group("param")
        if self._is_dynamic(param):
            return match.group(0)

        function_name = match.group("function_name") or ""
        return (
            f"{match.group('head')}'{self._prefix}{translator_namespace}"
            f"!{function_name}!{self._escape(param)}'"
        )
    
    @staticmethod
    def _is_dynamic(param: str) -> bool:
        return "${" in param

    @staticmethod
    def _escape(param: str) -> str:
        return param.replace("\\", "\\\\").replace("'", "\\'")


if __name__ == "__main__":
    sample = """
const labels = {
  title: e('page.title'),
  'sub-title': t("page.subtitle"),
  description: t.raw(`page.description`),
  count: t('page.count', { n: 3 }),
  dynamic: t(`page.${name}`),
};
"""
    print(MessageKeyConverter([
        {
            'name': 't',
            'namespace': 'Translator',
        },
        {
            'name': 'e',
            'namespace': 'Experience',
        }
    ]).convert(sample))