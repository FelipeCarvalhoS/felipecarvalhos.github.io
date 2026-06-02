'use client'

import { ContactType } from '@/types'
import { addIncrementalIDs } from '@/utils'
import { useTranslations } from 'next-intl'
import { RefObject, useRef, useState } from 'react'
import {
    Image as BsImage,
    Ratio,
    Button,
    OverlayTrigger,
    Tooltip,
    TooltipProps,
    OverlayTriggerProps,
    Alert,
} from 'react-bootstrap'

const FADE_DURATION_SECONDS = 0.5

function ContactTooltip({
    contact,
    children,
}: { contact: ContactType } & Omit<OverlayTriggerProps, 'overlay'>) {
    function renderTooltip({ id, text, ...props }: { id: string; text: string } & TooltipProps) {
        return (
            <Tooltip id={id} {...props}>
                {text}
            </Tooltip>
        )
    }

    return (
        <OverlayTrigger
            placement="top"
            overlay={props =>
                renderTooltip({
                    id: `tooltip-${contact.id}`,
                    text: contact.label,
                    ...props,
                })
            }
            key={contact.id}
        >
            {children}
        </OverlayTrigger>
    )
}

function CopyEmailAlert({ email, children }: { email: ContactType; children: React.ReactNode }) {
    const g = useTranslations('General')
    const t = useTranslations('Contacts')

    const [copyText, setText] = useState(email.label)
    const [show, setShow] = useState(false)
    const [variant, setVariant] = useState<'success' | 'danger'>('success')
    const [fadeOutTimeout, setFadeOutTimeout] = useState<NodeJS.Timeout | null>(null)
    const alertRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>

    function handleClick(text: string) {
        if (fadeOutTimeout) {
            clearTimeout(fadeOutTimeout)
            setFadeOutTimeout(null)
        }

        setShow(false)

        function onFulfilled() {
            setShow(true)
            setText(t('email.copied'))
            setVariant('success')
        }

        function onRejected() {
            setShow(true)
            setText(t('email.copyFailed'))
            setVariant('danger')
        }

        navigator.clipboard.writeText(text).then(onFulfilled, onRejected)
    }

    function handleClose() {
        alertRef.current.classList.remove('fade-in')
        alertRef.current.classList.add('fade-out')

        const timeout = setTimeout(() => {
            setShow(false)
        }, FADE_DURATION_SECONDS * 1000)

        setFadeOutTimeout(timeout)
    }

    return (
        <>
            <div onClick={() => handleClick(email.value)}>{children}</div>
            <Alert
                ref={alertRef}
                show={show}
                variant={variant}
                onClose={handleClose}
                className="position-fixed bottom-0 end-0 mb-4 me-4 fade-in"
                dismissible
                closeLabel={g('close')}
                transition={false}
                role="status"
                aria-live="polite"
            >
                <span className="me-3">{copyText}</span>
            </Alert>
        </>
    )
}

export default function ContactList() {
    const t = useTranslations('Contacts')

    const contacts: ContactType[] = addIncrementalIDs<ContactType>([
        {
            slug: 'email',
            label: t('email.label'),
            value: 'cs.felipe.carvalho@gmail.com',
            icon: { src: '/img/icons/email.svg', alt: 'Email' },
        },
        {
            slug: 'linkedin',
            label: t('linkedin.label'),
            value: 'linkedin.com/in/felipe-carvalho-s',
            url: 'https://linkedin.com/in/felipe-carvalho-s',
            icon: { src: '/img/icons/linkedin.svg', alt: 'LinkedIn' },
        },
        {
            slug: 'github',
            label: t('github.label'),
            value: 'github.com/FelipeCarvalhoS',
            url: 'https://github.com/FelipeCarvalhoS',
            icon: { src: '/img/icons/github-white.svg', alt: 'GitHub' },
        },
        {
            slug: 'whatsapp',
            label: t('whatsapp.label'),
            value: '+55 (11) 93147-7312',
            url: 'https://wa.me/5511931477312',
            icon: { src: '/img/icons/whatsapp.svg', alt: 'WhatsApp' },
        },
    ])

    const email = contacts.find(contact => contact.slug === 'email')!

    return (
        <div className="d-flex flex-column-reverse flex-md-row align-items-center row-gap-4 column-gap-3">
            <div className="d-none d-md-block">
                <CopyEmailAlert email={email}>
                    <ContactTooltip contact={email}>
                        <Button
                            className="rounded-pill"
                            style={{ padding: '0.75rem' }}
                            variant={email.slug}
                            aria-label={t('email.copy')}
                        >
                            <span className="icon-before icon-email px-1">{email.value}</span>
                        </Button>
                    </ContactTooltip>
                </CopyEmailAlert>
            </div>
            <div className="d-none d-sm-block d-md-none">
                <div style={{ padding: '0.75rem' }}>
                    <span className="icon-before icon-email px-1">{email.value}</span>
                </div>
            </div>
            <div className="d-block d-sm-none">
                <div style={{ padding: '0.75rem' }}>
                    <span className="px-1">{email.value}</span>
                </div>
            </div>

            <div className="d-flex gap-3">
                {contacts
                    .filter(contact => contact.slug !== 'email')
                    .map(contact => (
                        <ContactTooltip contact={contact} key={contact.id}>
                            <Button
                                as="a"
                                href={contact.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-pill"
                                style={{ padding: '0.75rem' }}
                                variant={contact.slug}
                            >
                                <Ratio aspectRatio="1x1" style={{ width: '1.75rem' }}>
                                    <BsImage
                                        src={contact.icon.src}
                                        alt={contact.icon.alt}
                                        fluid
                                        className="object-fit-contain"
                                    />
                                </Ratio>
                            </Button>
                        </ContactTooltip>
                    ))}
            </div>
        </div>
    )
}
