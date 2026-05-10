import { _Translator } from 'next-intl'

export function slugify(str: string): string {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, '-')
}

export function addIncrementalIDs<T>(arr: T[]): (T & { id: number })[] {
    return arr.map((item, index) => ({ id: index + 1, ...item }))
}

export function formatDate(date: Date | null, locale: string, monthType: 'long' | 'short'): string {
    if (!date)
        switch (locale) {
            case 'pt-br':
                return 'Presente'
            default:
                return 'Present'
        }

    let formatted = new Intl.DateTimeFormat(locale, { month: monthType, year: 'numeric' }).format(
        date,
    )

    formatted = formatted.replace('.', '').replace('de ', '')
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1)

    return formatted
}

export function addLocalizedFields<T extends { slug: string }>(
    t: _Translator,
    data: Partial<T>[],
    fieldNames: (keyof T)[],
): T[] {
    return data.map(item => {
        const localizedFields: Partial<Record<keyof T, any>> = {}

        fieldNames.forEach(fieldName => {
            localizedFields[fieldName] = t.raw(`${item.slug}.${String(fieldName)}`)
        })

        return { ...item, ...localizedFields } as T
    })
}
