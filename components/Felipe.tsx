export default function Felipe({ fullName = false }: { fullName?: boolean }) {
    return <span lang="pt-br">{fullName ? 'Felipe de Carvalho Santos' : 'Felipe Carvalho'}</span>
}
