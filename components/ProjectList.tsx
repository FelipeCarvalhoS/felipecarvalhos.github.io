'use client'

import { ProjectType } from '@/types'
import Project from './Project'
import { Button } from 'react-bootstrap'
import { addIncrementalIDs } from '@/utils'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { toDate } from '@/utils'

export default function ProjectList() {
    const e = useTranslations('Experience')
    const t = useTranslations('Projects')
    const locale = useLocale()

    const projects: ProjectType[] = addIncrementalIDs<ProjectType>([
        {
            slug: 'easytalk',
            title: t('easytalk.title'),
            start: toDate('February 2025'),
            end: toDate('December 2025'),
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
            start: toDate('February 2026'),
            end: toDate('March 2026'),
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
            start: toDate('September 2025'),
            end: toDate('November 2025'),
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
            bulletPoints: e.raw('habitat.bulletPoints'),
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
            slug: 'portfolio-site',
            title: t('portfolio-site.title'),
            start: toDate('March 2026'),
            end: toDate('May 2026'),
            technologies: [
                { name: 'React', logo: '/img/icons/react-darker.svg' },
                { name: 'Next.js', logo: '/img/icons/next-js.svg' },
                { name: 'TypeScript', logo: '/img/icons/typescript.svg' },
                { name: 'React Bootstrap', logo: '/img/icons/react-bootstrap.svg' },
            ],
            image: {
                partialUrl: `/img/projects/portfolio-site-${locale}`,
                extension: 'webp',
            },
            bulletPoints: t.raw('portfolio-site.bulletPoints'),
            links: [
                {
                    icon: { src: '/img/icons/github.svg', alt: 'GitHub' },
                    label: t('portfolio-site.links.repository'),
                    url: 'https://github.com/FelipeCarvalhoS/portfolio-site',
                },
            ],
        },
        {
            slug: 'switchbot',
            title: t('switchbot.title'),
            start: toDate('August 2024'),
            end: toDate('October 2024'),
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
            start: toDate('July 2024'),
            end: toDate('July 2024'),
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
        {
            slug: 'nintendo-shop-in-laravel',
            title: t('nintendo-shop-in-laravel.title'),
            start: toDate('June 2024'),
            end: toDate('June 2024'),
            technologies: [
                { name: 'PHP', logo: '/img/icons/php.svg' },
                { name: 'Laravel', logo: '/img/icons/laravel.webp' },
            ],
            image: {
                partialUrl: '/img/projects/nintendo-shop-in-laravel',
                extension: 'webp',
            },
            bulletPoints: t.raw('nintendo-shop-in-laravel.bulletPoints'),
            links: [
                {
                    icon: { src: '/img/icons/github.svg', alt: 'GitHub' },
                    label: t('picross.links.repository'),
                    url: 'https://github.com/FelipeCarvalhoS/nintendo-shop-in-laravel',
                },
                {
                    icon: {
                        src: '/img/icons/youtube.svg',
                        alt: 'YouTube',
                    },
                    label: t('nintendo-shop-in-laravel.links.video'),
                    url: 'https://youtu.be/lowjOax2_I4',
                },
            ],
        },
        {
            slug: 'ssbu-in-php',
            title: t('ssbu-in-php.title'),
            start: toDate('March 2024'),
            end: toDate('March 2024'),
            technologies: [{ name: 'PHP', logo: '/img/icons/php.svg' }],
            image: {
                partialUrl: '/img/projects/ssbu-in-php',
                extension: 'webp',
            },
            bulletPoints: t.raw('ssbu-in-php.bulletPoints'),
            links: [
                {
                    icon: { src: '/img/icons/github.svg', alt: 'GitHub' },
                    label: t('picross.links.repository'),
                    url: 'https://github.com/FelipeCarvalhoS/ssbu-in-php',
                },
                {
                    icon: {
                        src: '/img/icons/youtube.svg',
                        alt: 'YouTube',
                    },
                    label: t('ssbu-in-php.links.video'),
                    url: 'https://youtu.be/8H00iXewrXE',
                },
            ],
        },
    ])

    const initiallyLoaded = 4
    const toLoad = 4
    const [loadedProjects, setLoadedProjects] = useState(projects.slice(0, initiallyLoaded))

    return (
        <div className="d-flex flex-column align-items-center" style={{ gap: '7rem' }}>
            {loadedProjects.map((project, index) => (
                <Project
                    key={project.id}
                    project={project}
                    isEven={index % 2 === 0}
                    notLoadedInitially={index >= initiallyLoaded}
                />
            ))}
            {loadedProjects.length < projects.length && (
                <Button
                    variant="outline-secondary"
                    size="lg"
                    className="rounded-pill"
                    onClick={() =>
                        setLoadedProjects(
                            loadedProjects.concat(
                                projects.slice(
                                    loadedProjects.length,
                                    loadedProjects.length + toLoad,
                                ),
                            ),
                        )
                    }
                >
                    {t('loadMore')}
                </Button>
            )}
        </div>
    )
}
