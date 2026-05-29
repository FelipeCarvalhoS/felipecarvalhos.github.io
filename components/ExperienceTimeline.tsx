'use client'

import { ExperienceType } from '@/types'
import Experience from './Experience'
import { addIncrementalIDs } from '@/utils'
import { useTranslations } from 'next-intl'

export default function ExperienceTimeline() {
    const t = useTranslations('Experience')

    const experiences: ExperienceType[] = addIncrementalIDs<ExperienceType>([
        {
            slug: 'habitat',
            title: t('habitat.title'),
            company: {
                name: 'Habitat Arquitetura & Construção',
                logo: '/img/experiences/logos/habitat.webp',
            },
            start: new Date('September 2025'),
            end: new Date('November 2025'),
            bulletPoints: t.raw('habitat.bulletPoints'),
            attachment: {
                url: 'https://habitat.net.br',
                label: t('habitat.attachment.label'),
                type: 'link',
            },
        },
    ])

    return (
        <div style={{ maxWidth: '50rem' }} className="mx-auto">
            {experiences.map((experience, index) => (
                <Experience
                    key={experience.id}
                    isFirst={index === 0}
                    isLast={index === experiences.length - 1}
                    experience={experience}
                />
            ))}
        </div>
    )
}
