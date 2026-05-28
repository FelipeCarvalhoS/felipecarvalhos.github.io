export type AttachmentType = {
    url: string
    label: string
    type: 'link' | 'image' | 'anchor'
}

export type ExperienceType = {
    id: number
    slug: string
    title: string
    company: { name: string; logo: string }
    start: Date
    end: Date
    bulletPoints: string[]
}

export type ProjectType = {
    id: number
    slug: string
    title: string
    start: Date
    end: Date
    technologies: { name: string; logo: string }[]
    image: { partialUrl: string; extension: string }
    bulletPoints: string[]
    links: { icon: { src: string; alt: string }; label: string; url: string }[]
}

export type EducationType = {
    id: number
    slug: string
    title: string
    institution: { name: string; logo: string }
    grade: { value: number; maxValue: number; label: string }
    attachment?: AttachmentType & { name: string }
    start: Date
    end: Date
    bulletPoints?: string[]
    extraParagraphs?: string[]
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

export type HonorType = {
    id: number
    slug: string
    name: string
    description: string
    image: string
    attachment?: AttachmentType
}
