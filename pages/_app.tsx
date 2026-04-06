import type { AppProps } from 'next/app'
import '@/styles/fonts.scss'
import '@/styles/main.scss'
import { slugify } from '@/utils/slugify'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <MyNavbar />
            <Component {...pageProps} />
        </>
    )
}

function MyNavbar() {
    return (
        <Navbar
            bg="body"
            expand="md"
            className="sticky-top py-2 ps-3 ps-md-4 shadow-sm"
        >
            <Container fluid="xxl" className="flex-nowrap">
                <div className="h3 fw-normal me-3">Felipe Carvalho</div>
                <Navbar.Toggle aria-controls="offcanvas-navbar" />
                <Navbar.Offcanvas
                    id="offcanvas-navbar"
                    placement="end"
                    aria-labelledby="offcanvas-navbar-label"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvas-navbar-label">
                            Felipe Carvalho
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="justify-content-end">
                        <Nav
                            as="ul"
                            className="nav-fill flex-grow-1"
                            style={{ maxWidth: '40rem' }}
                        >
                            {[
                                'Sobre',
                                'Habilidades',
                                'Experiência',
                                'Projetos',
                                'Contato',
                            ].map(link => (
                                <Nav.Item as="li" key={link}>
                                    <Nav.Link
                                        className="fw-light px-2 fs-6"
                                        href={'#' + slugify(link)}
                                    >
                                        {link}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}
