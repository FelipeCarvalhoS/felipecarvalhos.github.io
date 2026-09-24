import type {
    EducationType,
    ExperienceType,
    HonorType,
    LanguageType,
    Localized,
    ProjectType,
    SkillType,
} from '@/types'
import { writeFileSync, mkdirSync, readFileSync, rmSync } from 'fs'
import path from 'path'

export type ResumeType = {
    firstName: string
    lastName: string
    fullName: string

    cpf: string

    contact: {
        email: string
        phone: { default: string; noCountryCode: string }
        linkedin: string
        portfolio: Localized<string> & { default: string }
        github: string
    }

    address: {
        line: string
        neighborhood: string
        city: string
        state: string
        zip: string
        country: Localized<string>
    }

    rg: {
        number: string
        issuingAgency: string
        issuingState: string
        issuingDate: string
    }

    summary: Localized<string>
    skills: SkillType[]
    education: EducationType[]
    experience: ExperienceType[]
    languages: LanguageType[]
    honors: HonorType[]
    projects: ProjectType[]
}

const fullCv = JSON.parse(
    readFileSync(path.join(__dirname, 'temporary', 'fullCv.json'), 'utf-8'),
) as ResumeType

function extractPickerCvFromFullCv() {
    return {
        fullName: fullCv.fullName,
        cpf: fullCv.cpf,
        contact: fullCv.contact,
        address: fullCv.address,
        rg: fullCv.rg,
        summary: fullCv.summary,
        education: fullCv.education,
        experience: fullCv.experience,
        projects: fullCv.projects,
        skills: fullCv.skills.map(skill => skill.name),
        honors: fullCv.honors,
    }
}

function createCvJsonFiles() {
    const jsonCv = JSON.stringify(fullCv, null, 4)
    const jsonPickerCv = JSON.stringify(extractPickerCvFromFullCv(), null, 4)

    mkdirSync(path.join(__dirname, 'json'), { recursive: true })
    writeFileSync(path.join(__dirname, 'json', 'cv.json'), jsonCv)
    writeFileSync(path.join(__dirname, 'json', 'picker_cv.json'), jsonPickerCv)
}

function cleanUpTemporary() {
    const temporaryDir = path.join(__dirname, 'temporary')
    rmSync(temporaryDir, { recursive: true, force: true })
}

createCvJsonFiles()
cleanUpTemporary()
