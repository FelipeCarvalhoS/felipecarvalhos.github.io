import { EducationType } from '@/types'
import { Accordion, Image as BsImage } from 'react-bootstrap'
import { CSSProperties } from 'react'
import { addIncrementalIDs, addLocalizedFields, formatDate } from '@/utils'
import { useLocale, useTranslations } from 'next-intl'

const educationData: Partial<EducationType>[] = addIncrementalIDs([
    {
        slug: 'fatec',
        institution: {
            name: 'Fatec Campinas',
            logo: '/img/education/logos/fatec.webp',
        },
        grade: { value: 9.4, maxValue: 10, type: 'average' },
        attachment: { image: '/img/education/attachments/fatec-diploma.webp', type: 'diploma' },
        start: new Date('February 2023'),
        end: new Date('December 2025'),
    },
    {
        slug: 'high-school',
        institution: {
            name: 'Griggs International Academy',
            logo: '/img/education/logos/griggs.webp',
        },
        grade: { value: 3.97, maxValue: 4, type: 'gpa' },
        attachment: { image: '/img/education/attachments/fatec-diploma.webp', type: 'transcript' },
        start: new Date('March 2020'),
        end: new Date('December 2022'),
    },
    {
        slug: 'ensino-medio',
        institution: {
            name: 'Colégio Adventista de Campinas',
            logo: '/img/education/logos/adventista.png',
        },
        grade: { value: 0, maxValue: 10, type: 'average' },
        attachment: { image: '/img/education/attachments/fatec-diploma.webp', type: 'diploma' },
        start: new Date('February 2020'),
        end: new Date('December 2022'),
    },
])

export default function EducationList() {
    const t = useTranslations('Education')
    const locale = useLocale()

    const educations = addLocalizedFields(t, educationData, [
        'title',
        'bulletPoints',
        'extraParagraphs',
    ])

    return (
        <Accordion
            alwaysOpen
            flush
            style={
                {
                    '--bs-accordion-border-width': '0',
                    '--bs-accordion-active-bg': 'transparent',
                    '--bs-accordion-active-color': 'inherit',
                    '--bs-accordion-btn-icon-width': '1.75rem',
                } as CSSProperties
            }
            className="vstack gap-4"
        >
            {educations.map(education => (
                <Accordion.Item
                    key={education.id}
                    eventKey={education.id.toString()}
                    className="border focus-ring focus-ring-primary"
                >
                    <Accordion.Header className="accordion-header-shadow-on-focus-visible">
                        <div className="d-flex gap-4 align-items-center font-base me-4">
                            <div className="d-none d-sm-block" style={{ minWidth: '5rem' }}>
                                <div className="ratio ratio-1x1">
                                    <BsImage
                                        className={`object-fit-contain ${education.slug === 'ensino-medio' ? 'p-2' : ''}`}
                                        src={education.institution.logo}
                                        alt={education.institution.name}
                                    />
                                </div>
                            </div>
                            <div className="text-start">
                                <h3 className="font-base fs-5 fw-semibold mb-2">
                                    {education.title}
                                </h3>
                                <div className="mb-2">{education.institution.name}</div>
                                <div className="text-body-secondary small">
                                    <span className="text-nowrap">
                                        {formatDate(education.start, locale, 'long')}
                                    </span>{' '}
                                    -{' '}
                                    <span className="text-nowrap">
                                        {formatDate(education.end, locale, 'long')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <ul className="mb-0">
                            {education.bulletPoints.map((point, index) => (
                                <li key={index}>
                                    <p
                                        className={
                                            index === education.bulletPoints.length - 1
                                                ? 'mb-0'
                                                : undefined
                                        }
                                    >
                                        {point}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        {education.extraParagraphs && (
                            <div className="mt-4">
                                {education.extraParagraphs.map(
                                    (paragraph, index, extraParagraphs) => (
                                        <p
                                            key={index}
                                            className={
                                                index === extraParagraphs.length - 1
                                                    ? 'mb-0'
                                                    : undefined
                                            }
                                        >
                                            {paragraph}
                                        </p>
                                    ),
                                )}
                            </div>
                        )}
                        {(education.attachment || education.grade) && (
                            <div className="mt-4 d-flex flex-wrap column-gap-3 row-gap-2">
                                {education.grade && (
                                    <div className="fw-medium">
                                        {t(education.grade.type, {
                                            value: education.grade.value,
                                            maxValue: education.grade.maxValue,
                                        })}
                                    </div>
                                )}
                                {education.attachment && (
                                    <a className="link-info text-decoration-none" role="button">
                                        {t('getAttachment', {
                                            attachmentType: t(education.attachment.type),
                                        })}
                                    </a>
                                )}
                            </div>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}
