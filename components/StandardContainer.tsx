import { Container } from 'react-bootstrap'

export default function StandardContainer({
    classNameExtra = '',
    children,
    ...props
}: React.ComponentProps<typeof Container> & { classNameExtra?: string }) {
    return (
        <Container fluid="xxl" className={`px-3 px-md-5 ${classNameExtra}`} {...props}>
            {children}
        </Container>
    )
}
