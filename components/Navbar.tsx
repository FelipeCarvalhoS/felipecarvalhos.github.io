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
import { CSSProperties, useEffect, useState } from 'react'
import Link from 'next/link'
import LocaleRichText from './LocaleRichText'

const BREAKPOINT_MD = 768

export default function MyNavbar() {
    const t = useTranslations('Navbar')
    const locale = useLocale()
    const [offcanvasShow, setOffcanvasShow] = useState(false)

    const links = [
        { key: 'about', onlyVisibleInOffcanvas: false },
        { key: 'skills', onlyVisibleInOffcanvas: false },
        { key: 'experience', onlyVisibleInOffcanvas: false },
        { key: 'education', onlyVisibleInOffcanvas: true },
        { key: 'projects', onlyVisibleInOffcanvas: false },
        { key: 'languages', onlyVisibleInOffcanvas: true },
        { key: 'honors', onlyVisibleInOffcanvas: true },
        { key: 'contact', onlyVisibleInOffcanvas: false },
    ].map(link => {
        return {
            label: t(link.key + '.label'),
            slug: t(link.key + '.slug'),
            onlyVisibleInOffcanvas: link.onlyVisibleInOffcanvas,
        }
    })

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth >= BREAKPOINT_MD) {
                const offcanvas = document.getElementById('offcanvas-navbar')!
                offcanvas.style.transition = 'none'
                setOffcanvasShow(false)
            }
        })
    }, [])

    function handleOffcanvasShow() {
        setOffcanvasShow(true)
    }

    function handleOffcanvasClose() {
        setOffcanvasShow(false)
    }

    function handleNavItemClick(link: (typeof links)[number]) {
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
                <LocaleRichText>{tags => t.rich('changeLocale', tags)}</LocaleRichText>
            </Tooltip>
        )
    }

    return (
        <Navbar id="navbar" bg="body" expand="md" className="sticky-top py-2 ps-2 shadow-sm">
            <StandardContainer className="flex-nowrap column-gap-3">
                <div className="h4 fw-normal mb-0">
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
                                    className={
                                        link.onlyVisibleInOffcanvas ? 'd-md-none' : undefined
                                    }
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

                            <hr className="d-md-none text-secondary w-100"></hr>
                            <div className="vr d-none d-md-block text-secondary mx-3"></div>

                            <OverlayTrigger placement="bottom" overlay={renderChangeLocaleTooltip}>
                                <Nav.Item
                                    as="li"
                                    className={`align-self-md-stretch d-flex justify-content-center align-items-stretch`}
                                >
                                    <Link
                                        href={'/' + (locale === 'pt-br' ? 'en' : 'pt-br')}
                                        scroll={false}
                                        className="px-2 d-md-flex align-items-center focus-ring focus-ring-primary"
                                    >
                                        <BsImage
                                            src="/img/icons/change-locale.webp"
                                            alt={t('changeLocaleAlt')}
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
