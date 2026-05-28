import { _Translator } from 'next-intl'

export function slugify(str: string): string {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, '-')
}

export function capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function addIncrementalIDs<T extends { id: number }>(arr: Omit<T, 'id'>[]): T[] {
    return arr.map((item, index) => ({ ...item, id: index + 1 })) as T[]
}

export function formatDate(
    date: Date | undefined,
    locale: string,
    monthType: 'long' | 'short',
): string {
    if (!date)
        switch (locale) {
            case 'pt-br':
                return 'Presente'
            default:
                return 'Present'
        }

    let formatted = new Intl.DateTimeFormat(locale, { month: monthType, year: 'numeric' })
        .format(date)
        .replace('.', '')
        .replace('de ', '')

    formatted = capitalizeFirst(formatted)

    return formatted
}

export function addLocalizedFields<T extends { slug: string }>(
    t: _Translator,
    data: Partial<T>[],
    fieldNames: (keyof T)[],
): T[] {
    return data.map(item => {
        const localizedFields: Partial<Record<keyof T, ReturnType<_Translator['raw']>>> = {}

        fieldNames.forEach(fieldName => {
            const translationPath = `${item.slug}.${fieldName.toString()}`

            if (t.has(translationPath)) {
                localizedFields[fieldName] = t.raw(translationPath)
            }
        })

        return { ...item, ...localizedFields } as T
    })
}
