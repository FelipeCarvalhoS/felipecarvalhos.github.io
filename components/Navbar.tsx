'use client'

import {
    Nav,
    Navbar,
    Offcanvas,
    Image as BsImage,
    Tooltip,
    OverlayTrigger,
    TooltipProps,
} from 'react-bootstrap'
import Felipe from './Felipe'
import StandardContainer from './StandardContainer'
import { useLocale, useTranslations } from 'next-intl'
import { CSSProperties, useState } from 'react'
import Link from 'next/link'

export default function MyNavbar() {
    const t = useTranslations('Navbar')
    const links = [
        { key: 'about', visible: true },
        { key: 'skills', visible: true },
        { key: 'experience', visible: true },
        { key: 'education', visible: false },
        { key: 'projects', visible: true },
        { key: 'languages', visible: false },
        { key: 'honors', visible: false },
        { key: 'contact', visible: true },
    ].map(link => {
        return {
            label: t(link.key + '.label'),
            slug: t(link.key + '.slug'),
            visible: link.visible,
        }
    })

    const locale = useLocale()
    const [offcanvasShow, setOffcanvasShow] = useState(false)

    function handleOffcanvasShow() {
        setOffcanvasShow(true)
    }

    function handleOffcanvasClose() {
        setOffcanvasShow(false)
    }

    function handleNavItemClick(link: (typeof links)[0]) {
        handleOffcanvasClose()

        const indexClicked = links.indexOf(link)

        for (let i = indexClicked; i >= 0; i--) {
            document
                .querySelectorAll(`[data-scrollspy-fade-triggered-by="${links[i].slug}"`)
                .forEach(element => {
                    const el = element as HTMLElement

                    if (el.dataset.scrollspyFaded === 'false') {
                        el.classList.add('fade-in')
                    }

                    el.dataset.scrollspyFaded = 'true'
                })
        }
    }

    function renderChangeLocaleTooltip(props: TooltipProps) {
        return (
            <Tooltip id="change-locale-tooltip" {...props}>
                {t('changeLocale')}
            </Tooltip>
        )
    }

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
                <Navbar.Toggle
                    onClick={handleOffcanvasShow}
                    aria-label={t('toggleNavigation')}
                    aria-controls="offcanvas-navbar"
                />
                <Navbar.Offcanvas
                    id="offcanvas-navbar"
                    placement="end"
                    aria-labelledby="offcanvas-navbar-label"
                    show={offcanvasShow}
                    onHide={handleOffcanvasClose}
                >
                    <Offcanvas.Header closeButton closeLabel={t('closeNavigation')}>
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
                            {links.map(link => (
                                <Nav.Item
                                    key={link.label}
                                    as="li"
                                    className={link.visible ? undefined : 'd-md-none'}
                                    onClick={() => handleNavItemClick(link)}
                                >
                                    <Nav.Link
                                        className="px-2"
                                        href={'#' + link.slug}
                                        data-scrollspy-fade-triggers={link.slug}
                                    >
                                        {link.label}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                            <div className="vr d-none d-md-block text-secondary mx-3"></div>
                            <hr className="d-block d-md-none text-secondary w-100"></hr>

                            <OverlayTrigger placement="bottom" overlay={renderChangeLocaleTooltip}>
                                <Nav.Item
                                    as="li"
                                    className="align-self-md-stretch d-flex justify-content-center align-items-stretch"
                                >
                                    <Link
                                        href={'/' + (locale === 'pt-br' ? 'en' : 'pt-br')}
                                        scroll={false}
                                        className="px-2 d-md-flex align-items-center focus-ring focus-ring-primary"
                                    >
                                        <BsImage
                                            src="/img/icons/change-locale.webp"
                                            alt={t('changeLocale')}
                                            style={{ height: '1.25rem' }}
                                        />
                                    </Link>
                                </Nav.Item>
                            </OverlayTrigger>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </StandardContainer>
        </Navbar>
    )
}
