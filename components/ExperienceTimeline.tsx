import { ExperienceType } from '@/types'
import Experience from './Experience'
import { addIncrementalIDs } from '@/utils'

const experiences: ExperienceType[] = addIncrementalIDs([
    {
        title: 'Estagiário de TI',
        company: {
            name: 'Habitat Arquitetura & Construção',
            logo: '/img/experiences/logos/habitat.png',
        },
        start: 'Setembro 2025',
        end: null,
        bulletPoints: [
            'Usando Django, reconstruí, em 3 meses, o site corporativo da empresa que antes era em WordPress.',
            'Configurei um painel administrativo que interage com o banco de dados MySQL para que o mantenedor do site pudesse atualizar seu conteúdo com facilidade.',
            'Refiz e modernizei o design do site, montando protótipos no Figma e implementando-os com Bootstrap.',
        ],
    },
])

export default function ExperienceTimeline() {
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
