import { ContactType } from '@/types'
import { addIncrementalIDs } from '@/utils'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
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

export default function ContactList() {
    const g = useTranslations('General')
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
    const [copyEmailAlertText, setCopyEmailAlertText] = useState(email.label)
    const [showCopyEmailAlert, setShowCopyEmailAlert] = useState(false)
    const [copyEmailAlertVariant, setCopyEmailAlertVariant] = useState<'success' | 'danger'>(
        'success',
    )

    function renderTooltip({ id, text, ...props }: { id: string; text: string } & TooltipProps) {
        return (
            <Tooltip id={id} {...props}>
                {text}
            </Tooltip>
        )
    }

    function handleEmailClick(text: string) {
        setShowCopyEmailAlert(false)

        function onFulfilled() {
            setShowCopyEmailAlert(true)
            setCopyEmailAlertText(t('email.copied'))
            setCopyEmailAlertVariant('success')
        }

        function onRejected() {
            setShowCopyEmailAlert(true)
            setCopyEmailAlertText(t('email.copyFailed'))
            setCopyEmailAlertVariant('danger')
        }

        navigator.clipboard.writeText(text).then(onFulfilled, onRejected)
    }

    function ContactTooltip({
        contact,
        children,
    }: { contact: ContactType } & Omit<OverlayTriggerProps, 'overlay'>) {
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

    function CopyEmailToast() {
        return (
            <Alert
                show={showCopyEmailAlert}
                variant={copyEmailAlertVariant}
                onClose={() => setShowCopyEmailAlert(false)}
                className="position-fixed bottom-0 end-0 mb-4 me-4 fade-in"
                dismissible
                closeLabel={g('close')}
                transition={false}
                role="status"
                aria-live="polite"
            >
                <span className="me-3">{copyEmailAlertText}</span>
            </Alert>
        )
    }

    return (
        <div className="d-flex flex-column-reverse flex-md-row align-items-center row-gap-4 column-gap-3">
            <CopyEmailToast></CopyEmailToast>
            <div className="d-none d-md-block">
                <ContactTooltip contact={email}>
                    <Button
                        onClick={() => handleEmailClick(email.value)}
                        className="rounded-pill"
                        style={{ padding: '0.75rem' }}
                        variant={email.slug}
                        aria-label={t('email.copy')}
                    >
                        <span className="icon-before icon-email px-1">{email.value}</span>
                    </Button>
                </ContactTooltip>
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
