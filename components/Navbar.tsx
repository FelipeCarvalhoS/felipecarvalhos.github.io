'use client'

import { Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { slugify } from '@/utils/slugify'
import { useLocale } from '@/app/LocaleProvider'
import Felipe from './Felipe'
import StandardContainer from './StandardContainer'

export default function MyNavbar() {
    const t = useLocale().t

    return (
        <Navbar bg="body" expand="md" className="sticky-top py-2 ps-3 ps-md-4 shadow-sm">
            <StandardContainer className="flex-nowrap">
                <div className="h4 fw-normal me-3 mb-0">
                    <Felipe />
                </div>
                <Navbar.Toggle aria-controls="offcanvas-navbar" />
                <Navbar.Offcanvas
                    id="offcanvas-navbar"
                    placement="end"
                    aria-labelledby="offcanvas-navbar-label"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvas-navbar-label">
                            <Felipe />
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="justify-content-end">
                        <Nav as="ul" className="nav-fill flex-grow-1" style={{ maxWidth: '40rem' }}>
                            {t.navbar.links.map((link: string) => (
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
            </StandardContainer>
        </Navbar>
    )
}
