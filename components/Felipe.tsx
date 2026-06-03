export default function Felipe({ fullName = false }: { fullName?: boolean }) {
    const name = fullName ? 'Felipe de Carvalho Santos' : 'Felipe Carvalho'
    return name
}
