import { SkillType } from '@/types'
import { addIncrementalIDs } from '@/utils'
import { Card, Image as BsImage, Ratio } from 'react-bootstrap'

const skills: SkillType[] = addIncrementalIDs([
    {
        name: 'Python',
        logo: 'img/icons/python.png',
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
        logo: 'img/icons/javascript.png',
    },
    {
        name: 'TypeScript',
        logo: 'img/icons/typescript.svg',
    },
    {
        name: 'React',
        logo: 'img/icons/react.png',
    },
    {
        name: 'Next.js',
        logo: 'img/icons/next-js.svg',
    },
    {
        name: 'HTML',
        logo: 'img/icons/html.png',
    },
    {
        name: 'CSS',
        logo: 'img/icons/css.svg',
    },
    {
        name: 'Sass',
        logo: 'img/icons/sass.png',
    },
    {
        name: 'Bootstrap',
        logo: 'img/icons/bootstrap.png',
    },
    {
        name: 'Git',
        logo: 'img/icons/git.svg',
    },
    {
        name: 'GitHub',
        logo: 'img/icons/github.svg',
    },
    {
        name: 'Figma',
        logo: 'img/icons/figma.png',
    },
])

export default function SkillList() {
    return (
        <div
            className="mx-auto d-flex flex-wrap gap-4 justify-content-center"
            style={{ maxWidth: '64rem' }}
        >
            {skills.map(skill => (
                <Card
                    key={skill.id}
                    className="skill align-items-center p-3 shadow-sm scale-on-hover"
                >
                    <Ratio aspectRatio="1x1" style={{ width: '50%' }} className="mb-3">
                        <BsImage src={skill.logo} className="object-fit-contain" />
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
