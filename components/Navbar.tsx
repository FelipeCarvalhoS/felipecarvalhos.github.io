'use client'

import { Nav, Navbar, Offcanvas, Image as BsImage, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { slugify } from '@/utils'
import Felipe from './Felipe'
import StandardContainer from './StandardContainer'
import { useLocale, useTranslations } from 'next-intl'
import { CSSProperties, useState } from 'react'

function NavItemWithTooltip({
    children,
    id,
    title,
}: {
    children: React.ReactNode
    id: string
    title: string
}) {
    return (
        <OverlayTrigger placement="bottom" overlay={<Tooltip id={id}>{title}</Tooltip>}>
            <Nav.Item
                style={
                    {
                        '--bs-box-shadow': 'none',
                        '--scale': '1.08',
                        '--duration': '0.2s',
                    } as CSSProperties
                }
                as="li"
                className="scale-on-hover align-self-md-stretch d-flex justify-content-center align-items-stretch"
            >
                {children}
            </Nav.Item>
        </OverlayTrigger>
    )
}

export default function MyNavbar() {
    const t = useTranslations('Navbar')
    const links = [t('about'), t('skills'), t('experience'), t('projects'), t('contact')]
    const locale = useLocale()
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <Navbar
            id="navbar"
            bg="body"
            expand="md"
            className="sticky-top py-2 ps-3 ps-md-4 shadow-sm"
        >
            <StandardContainer className="flex-nowrap">
                <div className="h4 fw-normal me-3 mb-0">
                    <Felipe />
                </div>
                <Navbar.Toggle onClick={handleShow} aria-controls="offcanvas-navbar" />
                <Navbar.Offcanvas
                    id="offcanvas-navbar"
                    placement="end"
                    aria-labelledby="offcanvas-navbar-label"
                    show={show}
                    onHide={handleClose}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className="fw-normal" id="offcanvas-navbar-label">
                            <Felipe />
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="justify-content-end">
                        <Nav
                            as="ul"
                            className="nav-fill flex-grow-1 align-items-start"
                            style={
                                {
                                    maxWidth: '40rem',
                                    '--bs-nav-link-hover-color': 'var(--bs-secondary)',
                                } as CSSProperties
                            }
                        >
                            {links.map((link: string) => (
                                <Nav.Item key={link} as="li" onClick={handleClose}>
                                    <Nav.Link className="px-2" href={'#' + slugify(link)}>
                                        {link}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                            <div className="vr d-none d-md-block text-secondary mx-3"></div>
                            <hr className="d-block d-md-none text-secondary w-100"></hr>

                            <NavItemWithTooltip
                                title={t('changeLocale')}
                                id="change-locale-tooltip"
                            >
                                <Nav.Link
                                    className="px-2 d-md-flex align-items-center"
                                    href={'/' + (locale === 'pt-br' ? 'en' : 'pt-br')}
                                    style={{ width: 'fit-content' }}
                                >
                                    <div className="visually-hidden">{t('changeLocale')}</div>
                                    <BsImage
                                        src="/img/icons/change-locale.webp"
                                        alt={t('changeLocale')}
                                        style={{ height: '1.25rem' }}
                                    />
                                </Nav.Link>
                            </NavItemWithTooltip>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </StandardContainer>
        </Navbar>
    )
}
