import Experience from './Experience'

type ExperienceType = {
    id: number
    title: string
    company: string
    companyLogo: string
    start: string
    end: string | null
    bulletPoints: string[]
}

const experiences: ExperienceType[] = [
    {
        id: 1,
        title: 'Estagiário de TI',
        company: 'Habitat Arquitetura & Construção',
        companyLogo: '/img/experience/logos/habitat.png',
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
        companyLogo: '/img/experience/logos/habitat.png',
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
        companyLogo: '/img/experience/logos/habitat.png',
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
        <div>
            {experiences.map(experience => (
                <Experience
                    key={experience.id}
                    isFirst={experience.id === 1}
                    isLast={experience.id === experiences.length}
                    experience={experience}
                />
            ))}
        </div>
    )
}
