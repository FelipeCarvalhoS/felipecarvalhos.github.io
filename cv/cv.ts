import type { ResumeType } from '@/cv/make_json_cv'
import { cvSecrets } from '@/cv/secret_cv'
import { toParagraphs } from '@/utils'

export const cv: ResumeType = {
    firstName: 'Felipe',
    lastName: 'Santos',
    fullName: 'Felipe de Carvalho Santos',

    summary: {
        en: toParagraphs([
            "• Developed Habitat Arquitetura & Construção's corporate website from the ground up using Django in 3 months during my time as an intern.",
            '• Technician degree in Systems Analysis and Development by Fatec Campinas.',
            '• Aspiring full-stack developer.',
            '',
            'Tech stack: Django, React, Next.js, FastAPI, Python, JavaScript, TypeScript, Bootstrap.',
            '',
            'Check out my portfolio: felipecarvalho.is-a.dev/en',
        ]),
        'pt-br': toParagraphs([
            '• Desenvolvi o website corporativo da Habitat Arquitetura & Construção do zero usando Django em 3 meses durante meu período como estagiário (habitat.net.br).',
            '• Tecnólogo em Análise e Desenvolvimento de Sistemas pela Fatec Campinas.',
            '• Aspirante a desenvolvedor full-stack.',
            '',
            'Tecnologias que tenho mais contato: Django, React, Next.js, FastAPI, Python, JavaScript, TypeScript, Bootstrap.',
            '',
            'Confira meu portfólio: felipecarvalho.is-a.dev/pt-br',
        ]),
    },

    contact: {
        email: 'cs.felipe.carvalho@gmail.com',
        phone: { default: '+55 (11) 93147-7312', noCountryCode: '(11) 93147-7312' },
        linkedin: 'https://linkedin.com/in/felipe-carvalho-s',
        portfolio: {
            en: 'https://felipecarvalho.is-a.dev/en',
            'pt-br': 'https://felipecarvalho.is-a.dev/pt-br',
            default: 'https://felipecarvalho.is-a.dev',
        },
        github: 'https://github.com/FelipeCarvalhoS',
    },

    skills: [],
    education: [],
    experience: [],
    languages: [],
    honors: [],

    ...cvSecrets,
} as const
