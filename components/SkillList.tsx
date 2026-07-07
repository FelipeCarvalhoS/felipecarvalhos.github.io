import { SkillType } from '@/types'
import { addIncrementalIDs } from '@/utils'
import { CSSProperties } from 'react'
import { Card, Image as BsImage, Ratio } from 'react-bootstrap'

const skills: SkillType[] = addIncrementalIDs<SkillType>([
    {
        name: 'Python',
        logo: 'img/icons/python.webp',
    },
    {
        name: 'Django',
        logo: 'img/icons/django.svg',
    },
    {
        name: 'FastAPI',
        logo: 'img/icons/fastapi.svg',
    },
    {
        name: 'JavaScript',
        logo: 'img/icons/javascript.webp',
    },
    {
        name: 'TypeScript',
        logo: 'img/icons/typescript.svg',
    },
    {
        name: 'React',
        logo: 'img/icons/react.webp',
    },
    {
        name: 'Next.js',
        logo: 'img/icons/next-js.svg',
    },
    {
        name: 'PHP',
        logo: 'img/icons/php.svg',
    },
    {
        name: 'HTML',
        logo: 'img/icons/html.webp',
    },
    {
        name: 'CSS',
        logo: 'img/icons/css.svg',
    },
    {
        name: 'Sass',
        logo: 'img/icons/sass.webp',
    },
    {
        name: 'Bootstrap',
        logo: 'img/icons/bootstrap.webp',
    },
    {
        name: 'Git',
        logo: 'img/icons/git.svg',
    },
    // {
    //     name: 'GitHub',
    //     logo: 'img/icons/github.svg',
    // },
    {
        name: 'Docker',
        logo: 'img/icons/docker.webp',
    },
])

export default function SkillList() {
    return (
        <div className="d-flex flex-wrap gap-4 justify-content-center">
            {skills.map(skill => (
                <Card
                    key={skill.id}
                    className="skill align-items-center p-3 shadow-sm scale-on-hover"
                    style={{ '--scale': '1.08', '--duration': '0.2s' } as CSSProperties}
                >
                    <Ratio aspectRatio="1x1" style={{ width: '50%' }} className="mb-3">
                        <BsImage src={skill.logo} alt="" className="object-fit-contain" />
                    </Ratio>
                    <Card.Body className="p-0">
                        <Card.Title as="h3" className="fs-6 font-base fw-normal mb-0">
                            <span className="d-block d-sm-none small">{skill.name}</span>
                            <span className="d-none d-sm-block">{skill.name}</span>
                        </Card.Title>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}
