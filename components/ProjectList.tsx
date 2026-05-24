import { ProjectType } from '@/types'
import Project from './Project'
import { Button } from 'react-bootstrap'
import { addIncrementalIDs, addLocalizedFields } from '@/utils'
import { useTranslations } from 'next-intl'

const projectData: Partial<ProjectType>[] = addIncrementalIDs([
    {
        slug: 'easytalk',
        start: new Date('February 2025'),
        end: new Date('December 2025'),
        technologies: [
            { name: 'Django', logo: '/img/icons/django.svg' },
            { name: 'Python', logo: '/img/icons/python.webp' },
            { name: 'Bootstrap', logo: '/img/icons/bootstrap.webp' },
            { name: 'Figma', logo: '/img/icons/figma.webp' },
        ],
        image: '/img/projects/easytalk.webp',
    },
    {
        slug: 'smash-ultimate-api',
        start: new Date('February 2026'),
        end: new Date('March 2026'),
        technologies: [
            { name: 'FastAPI', logo: '/img/icons/fastapi.svg' },
            { name: 'Python', logo: '/img/icons/python.webp' },
            { name: 'GitHub Actions', logo: '/img/icons/github.svg' },
            { name: 'Web Scraping', logo: '/img/icons/web-colorful.svg' },
        ],
        image: '/img/projects/easytalk.webp',
    },
    {
        slug: 'habitat-website',
        start: new Date('September 2025'),
        end: new Date('November 2025'),
        technologies: [
            { name: 'Django', logo: '/img/icons/django.svg' },
            { name: 'Python', logo: '/img/icons/python.webp' },
            { name: 'Bootstrap', logo: '/img/icons/bootstrap.webp' },
            { name: 'Figma', logo: '/img/icons/figma.webp' },
        ],
        image: '/img/projects/easytalk.webp',
    },
    {
        slug: 'switchbot',
        start: new Date('August 2024'),
        end: new Date('October 2024'),
        technologies: [
            { name: 'Python', logo: '/img/icons/python.webp' },
            { name: 'Discord.py', logo: '/img/icons/discord.webp' },
            { name: 'Firebase', logo: '/img/icons/firebase.webp' },
        ],
        image: '/img/projects/easytalk.webp',
    },
    {
        slug: 'picross',
        start: new Date('July 2024'),
        end: new Date('July 2024'),
        technologies: [
            { name: 'Python', logo: '/img/icons/python.webp' },
            { name: 'Pygame', logo: '/img/icons/pygame.webp' },
        ],
        image: '/img/projects/easytalk.webp',
    },
])

export default function ProjectList() {
    const t = useTranslations('Projects')

    const projects = addLocalizedFields(t, projectData, ['title', 'bulletPoints', 'links'])

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
