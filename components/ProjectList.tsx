import { ProjectType } from '@/types'
import Project from './Project'
import { Button } from 'react-bootstrap'
import { addIncrementalIDs, addLocalizedFields } from '@/utils'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

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
        image: '/img/projects/easytalk-1.png',
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
        image: '/img/projects/picross-2.png',
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
        image: '/img/projects/easytalk-1.png',
    },
    {
        slug: 'switchbot',
        start: new Date('August 2024'),
        end: new Date('October 2024'),
        technologies: [
            { name: 'Python', logo: '/img/icons/python.webp' },
            { name: 'Discord.py', logo: '/img/icons/discord.webp' },
            { name: 'Firebase', logo: '/img/icons/firebase.webp' },
            { name: 'Docker', logo: '/img/icons/docker.webp' },
        ],
        image: '/img/projects/picross-2.png',
    },
    {
        slug: 'picross',
        start: new Date('July 2024'),
        end: new Date('July 2024'),
        technologies: [
            { name: 'Python', logo: '/img/icons/python.webp' },
            { name: 'Pygame', logo: '/img/icons/pygame.webp' },
        ],
        image: '/img/projects/picross-1.png',
    },
])

export default function ProjectList() {
    const t = useTranslations('Projects')
    const projects = addLocalizedFields(t, projectData, ['title', 'bulletPoints', 'links'])

    const initiallyLoaded = 4
    const toLoad = 4
    const [timesLoaded, setTimesLoaded] = useState(0)
    const end = reachedEndOfArray() ? projects.length : getSliceEnd()

    function getSliceEnd() {
        return initiallyLoaded + toLoad * timesLoaded
    }

    function reachedEndOfArray() {
        return getSliceEnd() >= projects.length
    }

    return (
        <div className="d-flex flex-column align-items-center" style={{ gap: '7rem' }}>
            {projects.slice(0, end).map((project, index) => (
                <Project
                    key={project.id}
                    project={project}
                    isEven={index % 2 === 0}
                    beingLoaded={index >= getSliceEnd() - toLoad}
                />
            ))}
            {!reachedEndOfArray() && (
                <Button
                    variant="outline-secondary"
                    size="lg"
                    className="rounded-pill"
                    onClick={() => setTimesLoaded(timesLoaded + 1)}
                >
                    {t('loadMore')}
                </Button>
            )}
        </div>
    )
}
