export function addIncrementalIDs<T extends { id: number }>(arr: Omit<T, 'id'>[]): T[] {
    return arr.map((item, index) => ({ ...item, id: index + 1 })) as T[]
}

function capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
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
