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
            logo: '/img/experiences/logos/habitat.png',
        },
        start: new Date('September 2021'),
        end: null,
    },
])

export default function EducationList() {
    const t = useTranslations('Education')
    const locale = useLocale()

    const educations = addLocalizedFields(t, educationData, ['title', 'bulletPoints'])

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
                                        className="object-fit-contain"
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
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}
