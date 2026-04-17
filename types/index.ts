export type ExperienceType = {
    id: number
    title: string
    company: { name: string; logo: string }
    start: string
    end: string | null
    bulletPoints: string[]
}

export type ProjectType = {
    id: number
    title: string
    start: string
    end: string | null
    technologies: { name: string; logo: string }[]
    image: string
    bulletPoints: string[]
    links: { icon: { src: string; alt: string }; label: string; url: string }[]
}

export type EducationType = {
    id: number
    title: string
    institution: { name: string; logo: string }
    start: string
    end: string | null
    bulletPoints: string[]
}
