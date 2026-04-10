import { Container } from 'react-bootstrap'

export default function StandardContainer(props: React.ComponentProps<typeof Container>) {
    return (
        <Container fluid="xxl" {...props}>
            {props.children}
        </Container>
    )
}
