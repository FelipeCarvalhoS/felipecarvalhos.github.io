import { EducationType } from '@/types'
import { Accordion, Stack, Image as BsImage } from 'react-bootstrap'
import { CSSProperties } from 'react'
import { addIncrementalIDs } from '@/utils'

const educations: EducationType[] = addIncrementalIDs([
    {
        title: 'Análise e Desenvolvimento de Sistemas',
        institution: {
            name: 'Fatec Campinas',
            logo: '/img/experiences/logos/habitat.png',
        },
        start: 'Setembro 2025',
        end: null,
        bulletPoints: [
            'Elaborei o modelo entidade-relacionamento do sistema e o implementei em Django.',
            'Implementei as funções de pesquisa de profissionais e agendamento de consultas.',
            'Escrevi testes unitários que encontraram edge cases e bugs que antes não haviam sido considerados.',
            'Prototipei a interface no Figma e a construí usando Bootstrap.',
            'Obtive nota dez após apresentar o trabalho à banca de avaliadores.',
        ],
    },
    {
        title: 'Análise e Desenvolvimento de Sistemas',
        institution: {
            name: 'Fatec Campinas',
            logo: '/img/experiences/logos/habitat.png',
        },
        start: 'Setembro 2025',
        end: 'Novembro 2025',
        bulletPoints: [
            'Elaborei o modelo entidade-relacionamento do sistema e o implementei em Django.',
            'Implementei as funções de pesquisa de profissionais e agendamento de consultas.',
            'Escrevi testes unitários que encontraram edge cases e bugs que antes não haviam sido considerados.',
            'Prototipei a interface no Figma e a construí usando Bootstrap.',
            'Obtive nota dez após apresentar o trabalho à banca de avaliadores.',
        ],
    },
])

export default function EducationList() {
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
                                    <span className="text-nowrap">{education.start}</span> -{' '}
                                    <span className="text-nowrap">
                                        {education.end || 'Presente'}
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
