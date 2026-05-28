'use client'

import { EducationType } from '@/types'
import { Accordion, Image as BsImage } from 'react-bootstrap'
import { CSSProperties } from 'react'
import { addIncrementalIDs, capitalizeFirst, formatDate } from '@/utils'
import { useLocale, useTranslations } from 'next-intl'
import Attachment from './Attachment'

export default function EducationList() {
    const t = useTranslations('Education')
    const locale = useLocale()

    const educations: EducationType[] = addIncrementalIDs<EducationType>([
        {
            slug: 'fatec',
            title: t('fatec.title'),
            institution: {
                name: 'Fatec Campinas',
                logo: '/img/education/logos/fatec.webp',
            },
            grade: {
                value: 9.4,
                maxValue: 10,
                label: t('fatec.grade.label', { value: 9.4, maxValue: 10 }),
            },
            attachment: {
                url: '/img/education/attachments/fatec-diploma.webp',
                label: t('fatec.attachment.label'),
                type: 'image',
                name: t('fatec.attachment.name'),
            },
            start: new Date('February 2023'),
            end: new Date('December 2025'),
            extraParagraphs: t.raw('fatec.extraParagraphs'),
        },
        {
            slug: 'high-school',
            title: t('high-school.title'),
            institution: {
                name: 'Griggs International Academy',
                logo: '/img/education/logos/griggs.webp',
            },
            grade: {
                value: 3.97,
                maxValue: 4,
                label: t('high-school.grade.label', { value: 3.97, maxValue: 4 }),
            },
            attachment: {
                url: '/img/education/attachments/High-School-Official-Transcript.pdf',
                label: t('high-school.attachment.label'),
                type: 'link',
                name: t('high-school.attachment.name'),
            },
            start: new Date('March 2020'),
            end: new Date('December 2022'),
            bulletPoints: t.raw('high-school.bulletPoints'),
            extraParagraphs: t.raw('high-school.extraParagraphs'),
        },
        {
            slug: 'ensino-medio',
            title: t('ensino-medio.title'),
            institution: {
                name: 'Colégio Adventista de Campinas',
                logo: '/img/education/logos/adventista.png',
            },
            grade: {
                value: 0,
                maxValue: 10,
                label: t('ensino-medio.grade.label', { value: 0, maxValue: 10 }),
            },
            attachment: {
                url: '/img/education/attachments/fatec-diploma.webp',
                label: t('ensino-medio.attachment.label'),
                type: 'image',
                name: 'Diploma',
            },
            start: new Date('February 2020'),
            end: new Date('December 2022'),
            bulletPoints: t.raw('ensino-medio.bulletPoints'),
        },
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
                        {education.bulletPoints && (
                            <ul className="mb-4">
                                {education.bulletPoints.map((point, index, bulletPoints) => (
                                    <li key={index}>
                                        <p
                                            className={
                                                index === bulletPoints.length - 1
                                                    ? 'mb-0'
                                                    : undefined
                                            }
                                        >
                                            {point}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {education.extraParagraphs && (
                            <div className="mb-4">
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
                            <div className="d-flex flex-wrap column-gap-3 row-gap-2">
                                {education.grade && (
                                    <div className="fw-medium">{education.grade.label}</div>
                                )}
                                {education.attachment && (
                                    <Attachment
                                        attachment={education.attachment}
                                        alt={`${education.title} - ${capitalizeFirst(education.attachment.name)}`}
                                    />
                                )}
                            </div>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}
