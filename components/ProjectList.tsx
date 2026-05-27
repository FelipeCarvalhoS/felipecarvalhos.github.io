'use client'

import { ProjectType } from '@/types'
import Project from './Project'
import { Button } from 'react-bootstrap'
import { addIncrementalIDs } from '@/utils'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function ProjectList() {
    const t = useTranslations('Projects')

    const projects: ProjectType[] = addIncrementalIDs([
        {
            slug: 'easytalk',
            title: t('easytalk.title'),
            start: new Date('February 2025'),
            end: new Date('December 2025'),
            technologies: [
                { name: 'Django', logo: '/img/icons/django.svg' },
                { name: 'Python', logo: '/img/icons/python.webp' },
                { name: 'Bootstrap', logo: '/img/icons/bootstrap.webp' },
                { name: 'Figma', logo: '/img/icons/figma.webp' },
            ],
            image: {
                partialUrl: '/img/projects/easytalk',
                extension: 'webp',
            },
            bulletPoints: t.raw('easytalk.bulletPoints'),
            links: [
                {
                    icon: { src: '/img/icons/github.svg', alt: 'GitHub' },
                    label: t('easytalk.links.repository'),
                    url: 'https://github.com/TG-Easy-Talk/django-easy-talk',
                },
                {
                    icon: { src: '/img/icons/youtube.svg', alt: 'YouTube' },
                    label: t('easytalk.links.video'),
                    url: 'https://youtu.be/dy_LrgH9iHo?si=Dxhs_SjoercwWu9W',
                },
            ],
        },
        {
            slug: 'smash-ultimate-api',
            title: t('smash-ultimate-api.title'),
            start: new Date('February 2026'),
            end: new Date('March 2026'),
            technologies: [
                { name: 'FastAPI', logo: '/img/icons/fastapi.svg' },
                { name: 'Python', logo: '/img/icons/python.webp' },
                { name: 'GitHub Actions', logo: '/img/icons/github.svg' },
                { name: 'Web Scraping', logo: '/img/icons/web-colorful.svg' },
            ],
            image: {
                partialUrl: '/img/projects/smash-ultimate-api',
                extension: 'webp',
            },
            bulletPoints: t.raw('smash-ultimate-api.bulletPoints'),
            links: [
                {
                    icon: { src: '/img/icons/github.svg', alt: 'GitHub' },
                    label: t('smash-ultimate-api.links.repository'),
                    url: 'https://github.com/FelipeCarvalhoS/smash-ultimate-api',
                },
                {
                    icon: {
                        src: '/img/icons/notepad.svg',
                        alt: t('smash-ultimate-api.links.docAlt'),
                    },
                    label: t('smash-ultimate-api.links.documentation'),
                    url: 'https://smash-ultimate-api.vercel.app/',
                },
            ],
        },
        {
            slug: 'habitat-website',
            title: t('habitat-website.title'),
            start: new Date('September 2025'),
            end: new Date('November 2025'),
            technologies: [
                { name: 'Django', logo: '/img/icons/django.svg' },
                { name: 'Python', logo: '/img/icons/python.webp' },
                { name: 'Bootstrap', logo: '/img/icons/bootstrap.webp' },
                { name: 'Figma', logo: '/img/icons/figma.webp' },
            ],
            image: {
                partialUrl: '/img/projects/habitat-website',
                extension: 'webp',
            },
            bulletPoints: t.raw('habitat-website.bulletPoints'),
            links: [
                {
                    icon: {
                        src: '/img/icons/web.svg',
                        alt: t('habitat-website.links.webAlt'),
                    },
                    label: t('habitat-website.links.website'),
                    url: 'https://habitat.net.br',
                },
            ],
        },
        {
            slug: 'switchbot',
            title: t('switchbot.title'),
            start: new Date('August 2024'),
            end: new Date('October 2024'),
            technologies: [
                { name: 'Python', logo: '/img/icons/python.webp' },
                { name: 'Discord.py', logo: '/img/icons/discord.webp' },
                { name: 'Firebase', logo: '/img/icons/firebase.webp' },
                { name: 'Docker', logo: '/img/icons/docker.webp' },
            ],
            image: {
                partialUrl: '/img/projects/switchbot',
                extension: 'webp',
            },
            bulletPoints: t.raw('switchbot.bulletPoints'),
            links: [
                {
                    icon: { src: '/img/icons/github.svg', alt: 'GitHub' },
                    label: t('switchbot.links.repository'),
                    url: 'https://github.com/FelipeCarvalhoS/switchbot',
                },
                {
                    icon: { src: '/img/icons/youtube.svg', alt: 'YouTube' },
                    label: t('switchbot.links.video'),
                    url: 'https://youtu.be/yWUL_Jxg8LE',
                },
            ],
        },
        {
            slug: 'picross',
            title: t('picross.title'),
            start: new Date('July 2024'),
            end: new Date('July 2024'),
            technologies: [
                { name: 'Python', logo: '/img/icons/python.webp' },
                { name: 'Pygame', logo: '/img/icons/pygame.webp' },
            ],
            image: {
                partialUrl: '/img/projects/picross',
                extension: 'webp',
            },
            bulletPoints: t.raw('picross.bulletPoints'),
            links: [
                {
                    icon: { src: '/img/icons/github.svg', alt: 'GitHub' },
                    label: t('picross.links.repository'),
                    url: 'https://github.com/FelipeCarvalhoS/picross-in-python',
                },
                {
                    icon: {
                        src: '/img/icons/controller.svg',
                        alt: t('picross.links.playAlt'),
                    },
                    label: t('picross.links.play'),
                    url: 'https://felipinho5.itch.io/picross',
                },
            ],
        },
    ])

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
