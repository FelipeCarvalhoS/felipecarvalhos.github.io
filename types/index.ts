export type ExperienceType = {
    id: number
    slug: string
    title: string
    company: { name: string; logo: string }
    start: Date
    end: Date | null
    bulletPoints: string[]
}

export type ProjectType = {
    id: number
    slug: string
    title: string
    start: Date
    end: Date | null
    technologies: { name: string; logo: string }[]
    image: string
    bulletPoints: string[]
    links: { icon: { src: string; alt: string }; label: string; url: string }[]
}

export type EducationType = {
    id: number
    slug: string
    title: string
    institution: { name: string; logo: string }
    start: Date
    end: Date | null
    bulletPoints: string[]
}

export type SkillType = {
    id: number
    name: string
    logo: string
}

export type LanguageType = {
    id: number
    slug: string
    name: string
    proficiency: string
    flags: string[]
    certificates: { name: string; issued_at: Date; url: string }[]
}
