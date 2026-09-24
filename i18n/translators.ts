import { routing } from '@/i18n/routing'
import { type _Translator, createTranslator } from 'use-intl'
import en_messages from '@/messages/en.json'
import pt_br_messages from '@/messages/pt-br.json'
import type { AvailableLocale, Localized } from '@/types'

type MessageJson = (typeof messages)[keyof typeof messages]
type NamespaceKey = keyof MessageJson
type NamespacedTranslator = _Translator<MessageJson, NamespaceKey>
type LocalizedNamespacedTranslators = Localized<NamespacedTranslator>
type LocalizedNamespacedTranslatorsEntries = [AvailableLocale, NamespacedTranslator][]

const messages = {
    en: en_messages,
    'pt-br': pt_br_messages,
} as const satisfies Record<AvailableLocale, object>

function getLocalizedNamespaceTranslators(
    translatorNamespace: NamespaceKey,
): LocalizedNamespacedTranslators {
    const translators = {} as LocalizedNamespacedTranslators

    for (const locale of routing.locales) {
        translators[locale] = createTranslator({
            locale: locale,
            messages: messages[locale],
            namespace: translatorNamespace,
        })
    }

    return translators
}

export function getLocalizedNamespacedTranslatorsEntries(
    translatorNamespace: NamespaceKey,
): LocalizedNamespacedTranslatorsEntries {
    const translators = getLocalizedNamespaceTranslators(translatorNamespace)
    const entries = Object.entries(translators)
    return entries as LocalizedNamespacedTranslatorsEntries
}
