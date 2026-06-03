import { ReactNode } from 'react'
import { routing } from '@/i18n/routing'

type Locale = (typeof routing.locales)[number]

type LocaleRichTextProps = {
    children(tags: Record<Locale, (chunks: ReactNode) => ReactNode>): ReactNode
}

export default function LocaleRichText({ children }: LocaleRichTextProps) {
    const tags = {} as Record<Locale, (chunks: ReactNode) => ReactNode>

    routing.locales.forEach(locale => {
        tags[locale] = (chunks: ReactNode) => <span lang={locale}>{chunks}</span>
    })

    return children(tags)
}
