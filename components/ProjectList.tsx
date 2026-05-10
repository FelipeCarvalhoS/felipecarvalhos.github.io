import { ProjectType } from '@/types'
import Project from './Project'
import { Button } from 'react-bootstrap'
import { addIncrementalIDs, addLocalizedFields } from '@/utils'
import { useTranslations } from 'next-intl'

const projectData: Partial<ProjectType>[] = addIncrementalIDs([
    {
        slug: 'easytalk-present',
        start: new Date('September 2025'),
        end: null,
        technologies: [
            { name: 'Django', logo: '/img/icons/django.svg' },
            { name: 'Python', logo: '/img/icons/python.png' },
            { name: 'Bootstrap', logo: '/img/icons/bootstrap.png' },
        ],
        image: '/img/projects/easytalk.png',
    },
    {
        slug: 'easytalk',
        start: new Date('September 2025'),
        end: new Date('November 2025'),
        technologies: [
            { name: 'Django', logo: '/img/icons/django.svg' },
            { name: 'Python', logo: '/img/icons/python.png' },
            { name: 'Bootstrap', logo: '/img/icons/bootstrap.png' },
        ],
        image: '/img/projects/easytalk.png',
    },
])

export default function ProjectList() {
    const t = useTranslations('Projects')

    const projects: ProjectType[] = addLocalizedFields(t, projectData, [
        'title',
        'bulletPoints',
        'links',
    ])

    return (
        <div className="d-flex flex-column align-items-center" style={{ gap: '7rem' }}>
            {projects.map((project, index) => (
                <Project key={project.id} project={project} isEven={index % 2 === 0} />
            ))}
            <Button variant="outline-secondary" size="lg" className="rounded-pill">
                {t('loadMore')}
            </Button>
        </div>
    )
}
