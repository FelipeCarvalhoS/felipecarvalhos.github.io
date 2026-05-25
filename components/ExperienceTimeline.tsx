import { ExperienceType } from '@/types'
import Experience from './Experience'
import { addIncrementalIDs, addLocalizedFields } from '@/utils'
import { useTranslations } from 'next-intl'

const experienceData: Partial<ExperienceType>[] = addIncrementalIDs([
    {
        slug: 'habitat',
        company: {
            name: 'Habitat Arquitetura & Construção',
            logo: '/img/experiences/logos/habitat.webp',
        },
        start: new Date('September 2025'),
        end: new Date('November 2025'),
    },
])

export default function ExperienceTimeline() {
    const t = useTranslations('Experience')

    const experiences = addLocalizedFields(t, experienceData, ['title', 'bulletPoints'])

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
