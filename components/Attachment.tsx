import Link from 'next/link'
import UnstyledButton from './UnstyledButton'
import { useTranslations } from 'next-intl'
import { AttachmentType } from '@/types'
import ImageModal from './ImageModal'

export default function Attachment({
    attachment,
    alt = '',
    stretchLink = false,
}: {
    attachment: AttachmentType
    alt?: string
    stretchLink?: boolean
}) {
    const t = useTranslations('Attachment')
    const stretchLinkClass = stretchLink ? 'stretched-link' : ''

    switch (attachment.type) {
        case 'image':
            return (
                <ImageModal src={attachment.url} alt={alt}>
                    <UnstyledButton
                        className={`link-info text-decoration-none ${stretchLinkClass}`}
                    >
                        <span className="icon-after icon-image">{attachment.label}</span>
                    </UnstyledButton>
                </ImageModal>
            )
        case 'link':
            return (
                <Link
                    target="_blank"
                    href={attachment.url}
                    className={`link-info text-decoration-none ${stretchLinkClass}`}
                >
                    <span className="icon-after icon-external-link">{attachment.label}</span>
                </Link>
            )
        case 'anchor':
            return (
                <a
                    href={attachment.url}
                    className={`link-info text-decoration-none ${stretchLinkClass}`}
                >
                    <span className="icon-after icon-anchor">{attachment.label}</span>
                </a>
            )
        default:
            return null
    }
}
