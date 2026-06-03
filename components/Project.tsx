'use client'

import { ProjectType } from '@/types'
import { formatDate } from '@/utils'
import { useLocale, useTranslations } from 'next-intl'
import { Image as BsImage, Badge, Stack, Ratio, Dropdown } from 'react-bootstrap'
import FadeIn from './FadeIn'

export default function Project({ project, isEven }: { project: ProjectType; isEven: boolean }) {
    const locale = useLocale()
    const t = useTranslations('Projects')

    return (
        <FadeIn>
            <div
                id={project.slug}
                className={`d-flex justify-content-between align-items-center gap-6 flex-column-reverse ${isEven ? 'flex-lg-row' : 'flex-lg-row-reverse'}`}
                style={{ scrollMarginTop: '6rem' }}
            >
                <div style={{ flexBasis: '50%' }}>
                    <h3 className="font-base fs-5 fw-semibold mb-2">{project.title}</h3>
                    <div className="mb-4 text-body-secondary">
                        {formatDate(project.start, locale, 'long')}
                        {project.start.toString() !== project.end?.toString() && (
                            <>
                                {' - '}
                                {formatDate(project.end, locale, 'long')}
                            </>
                        )}
                    </div>
                    <Stack direction="horizontal" className="flex-wrap gap-2 mb-4">
                        {project.technologies.map(technology => (
                            <Badge
                                key={technology.name}
                                as="div"
                                pill
                                bg="secondary"
                                className="d-flex align-items-center gap-1 px-2 py-1 bg-opacity-10 border border-secondary"
                            >
                                <Ratio aspectRatio="1x1" style={{ width: '1.33em' }}>
                                    <BsImage
                                        src={technology.logo}
                                        alt=""
                                        className="object-fit-contain"
                                    />
                                </Ratio>
                                <span className="text-body fw-light">{technology.name}</span>
                            </Badge>
                        ))}
                    </Stack>
                    <ul className="mb-4">
                        {project.bulletPoints.map((point, index) => (
                            <li key={index}>
                                <p>{point}</p>
                            </li>
                        ))}
                    </ul>
                    <Dropdown className="pt-2">
                        <Dropdown.Toggle
                            variant="primary"
                            id={`dropdown-${project.id}`}
                            className="rounded-pill px-3"
                        >
                            <span className="pe-2">{t('learnMore')}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="my-1 shadow-sm">
                            {project.links.map((link, index) => (
                                <Dropdown.Item
                                    href={link.url}
                                    key={index}
                                    className="d-flex gap-2 py-2 text-black"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Ratio aspectRatio="1x1" style={{ width: '1.25em' }}>
                                        <BsImage src={link.icon.src} alt={link.icon.alt} />
                                    </Ratio>
                                    <span>{link.label}</span>
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div
                    style={{ flexBasis: '50%' }}
                    className="d-flex align-self-center position-relative"
                >
                    <BsImage
                        src={`${project.image.partialUrl}-${isEven ? '1' : '2'}.${project.image.extension}`}
                        alt=""
                        className="img-fluid object-fit-contain"
                    />
                </div>
            </div>
        </FadeIn>
    )
}
