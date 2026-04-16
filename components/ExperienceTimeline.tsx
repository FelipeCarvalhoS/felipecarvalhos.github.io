import { ExperienceType } from '@/types'
import Experience from './Experience'

const experiences: ExperienceType[] = [
    {
        id: 1,
        title: 'Estagiário de TI',
        company: 'Habitat Arquitetura & Construção',
        companyLogo: '/img/experiences/logos/habitat.png',
        start: 'Setembro 2025',
        end: null,
        bulletPoints: [
            'Usando Django, reconstruí, em 3 meses, o site corporativo da empresa que antes era em WordPress.',
            'Configurei um painel administrativo que interage com o banco de dados MySQL para que o mantenedor do site pudesse atualizar seu conteúdo com facilidade.',
            'Refiz e modernizei o design do site, montando protótipos no Figma e implementando-os com Bootstrap.',
        ],
    },
    {
        id: 2,
        title: 'Estagiário de TI',
        company: 'Habitat Arquitetura & Construção',
        companyLogo: '/img/experiences/logos/habitat.png',
        start: 'Setembro 2025',
        end: 'Novembro 2025',
        bulletPoints: [
            'Usando Django, reconstruí, em 3 meses, o site corporativo da empresa que antes era em WordPress.',
            'Configurei um painel administrativo que interage com o banco de dados MySQL para que o mantenedor do site pudesse atualizar seu conteúdo com facilidade.',
            'Refiz e modernizei o design do site, montando protótipos no Figma e implementando-os com Bootstrap.',
        ],
    },
    {
        id: 3,
        title: 'Estagiário de TI',
        company: 'Habitat Arquitetura & Construção',
        companyLogo: '/img/experiences/logos/habitat.png',
        start: 'Setembro 2025',
        end: 'Novembro 2025',
        bulletPoints: [
            'Usando Django, reconstruí, em 3 meses, o site corporativo da empresa que antes era em WordPress.',
            'Configurei um painel administrativo que interage com o banco de dados MySQL para que o mantenedor do site pudesse atualizar seu conteúdo com facilidade.',
            'Refiz e modernizei o design do site, montando protótipos no Figma e implementando-os com Bootstrap.',
        ],
    },
]

export default function ExperienceTimeline() {
    return (
        <>
            {experiences.map(experience => (
                <Experience
                    key={experience.id}
                    isFirst={experience.id === 1}
                    isLast={experience.id === experiences.length}
                    experience={experience}
                />
            ))}
        </>
    )
}
