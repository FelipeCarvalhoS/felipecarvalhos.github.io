import { ProjectType } from '@/types'
import { Image as BsImage, Badge, Stack, Ratio, Dropdown } from 'react-bootstrap'

export default function Project({ project, isEven }: { project: ProjectType; isEven: boolean }) {
    return (
        <div
            className={`d-flex justify-content-between gap-6 flex-column-reverse ${isEven ? 'flex-lg-row' : 'flex-lg-row-reverse'}`}
        >
            <div>
                <h3 className="font-base fs-5 fw-semibold mb-2">{project.title}</h3>
                <div className="mb-4 text-body-secondary">
                    {project.start} - {project.end || 'Presente'}
                </div>
                <Stack direction="horizontal" className="gap-2 mb-4">
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
                                    alt={technology.name}
                                    className="object-fit-contain"
                                />
                            </Ratio>
                            <span className="text-body fw-light">{technology.name}</span>
                        </Badge>
                    ))}
                </Stack>
                <ul className="mb-5">
                    {project.bulletPoints.map((point, index) => (
                        <li key={index}>
                            <p>{point}</p>
                        </li>
                    ))}
                </ul>
                <Dropdown>
                    <Dropdown.Toggle
                        variant="primary"
                        id={`dropdown-${project.id}`}
                        className="rounded-pill px-3"
                    >
                        <span className="pe-2">Saiba Mais</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="py-0">
                        {project.links.map((link, index) => (
                            <Dropdown.Item
                                href={link.url}
                                key={index}
                                className="d-flex gap-2 py-2"
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
            <div style={{ flexBasis: '70%' }} className="d-flex align-self-center">
                <BsImage src={project.image} alt="" className="img-fluid object-fit-contain" />
            </div>
        </div>
    )
}
