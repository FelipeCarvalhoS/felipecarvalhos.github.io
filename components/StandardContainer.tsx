import { Container } from 'react-bootstrap'

export default function StandardContainer({
    children,
    ...props
}: React.ComponentProps<typeof Container>) {
    return (
        <Container fluid="xxl" className="px-3 px-md-5" {...props}>
            {children}
        </Container>
    )
}
