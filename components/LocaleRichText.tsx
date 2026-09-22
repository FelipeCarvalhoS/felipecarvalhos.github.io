import { ReactNode } from 'react'
import { routing } from '@/i18n/routing'
import type { AvailableLocale } from '@/types'

type TagChunkRecord = Record<AvailableLocale, (chunks: ReactNode) => ReactNode>

type LocaleRichTextProps = {
    children(tags: TagChunkRecord): ReactNode
}

export default function LocaleRichText({ children }: LocaleRichTextProps) {
    const tags = {} as TagChunkRecord

    routing.locales.forEach(locale => {
        tags[locale] = (chunks: ReactNode) => <span lang={locale}>{chunks}</span>
    })

    return children(tags)
}
