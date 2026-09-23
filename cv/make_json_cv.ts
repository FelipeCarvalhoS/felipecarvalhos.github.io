import { cv } from '@/cv/cv'
import type {
    EducationType,
    ExperienceType,
    HonorType,
    LanguageType,
    Localized,
    SkillType,
} from '@/types'
import { writeFileSync, mkdirSync } from 'fs'
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
}

function extractPickerCvFromFullCv() {
    return {
        fullName: cv.fullName,
        cpf: cv.cpf,
        contact: cv.contact,
        address: cv.address,
        rg: cv.rg,
        summary: cv.summary,
        education: cv.education,
        experience: cv.experience,
    }
}

function createCvJsonFiles() {
    const jsonCv = JSON.stringify(cv, null, 4)
    const jsonPickerCv = JSON.stringify(extractPickerCvFromFullCv(), null, 4)

    mkdirSync(path.join(__dirname, 'json'), { recursive: true })
    writeFileSync(path.join(__dirname, 'json', 'cv.json'), jsonCv)
    writeFileSync(path.join(__dirname, 'json', 'picker_cv.json'), jsonPickerCv)
}

createCvJsonFiles()
