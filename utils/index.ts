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
