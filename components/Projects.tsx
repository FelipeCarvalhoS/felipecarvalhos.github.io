import { ProjectType } from '@/types'
import Project from './Project'
import { Button } from 'react-bootstrap'

const projects: ProjectType[] = [
    {
        id: 1,
        title: 'EasyTalk: Web App de Psicoterapia',
        start: 'Setembro 2025',
        end: null,
        technologies: [
            { name: 'Django', logo: '/img/icons/django.svg' },
            { name: 'Python', logo: '/img/icons/python.png' },
            { name: 'Bootstrap', logo: '/img/icons/bootstrap.png' },
        ],
        image: '/img/projects/easytalk.png',
        bulletPoints: [
            'Elaborei o modelo entidade-relacionamento do sistema e o implementei em Django.',
            'Implementei as funções de pesquisa de profissionais e agendamento de consultas.',
            'Escrevi testes unitários que encontraram edge cases e bugs que antes não haviam sido considerados.',
            'Prototipei a interface no Figma e a construí usando Bootstrap.',
            'Obtive nota dez após apresentar o trabalho à banca de avaliadores.',
        ],
        links: [
            {
                icon: {
                    src: '/img/icons/github.svg',
                    alt: 'GitHub',
                },
                label: 'Repositório',
                url: '#',
            },
            {
                icon: {
                    src: '/img/icons/youtube.svg',
                    alt: 'YouTube',
                },
                label: 'Vídeo Demonstrativo',
                url: '#',
            },
        ],
    },
    {
        id: 2,
        title: 'EasyTalk: Web App de Psicoterapia',
        start: 'Setembro 2025',
        end: 'Novembro 2025',
        technologies: [
            { name: 'Django', logo: '/img/icons/django.svg' },
            { name: 'Python', logo: '/img/icons/python.png' },
            { name: 'Bootstrap', logo: '/img/icons/bootstrap.png' },
        ],
        image: '/img/projects/easytalk.png',
        bulletPoints: [
            'Elaborei o modelo entidade-relacionamento do sistema e o implementei em Django.',
            'Implementei as funções de pesquisa de profissionais e agendamento de consultas.',
            'Escrevi testes unitários que encontraram edge cases e bugs que antes não haviam sido considerados.',
            'Prototipei a interface no Figma e a construí usando Bootstrap.',
            'Obtive nota dez após apresentar o trabalho à banca de avaliadores.',
        ],
        links: [
            {
                icon: {
                    src: '/img/icons/github.svg',
                    alt: 'GitHub',
                },
                label: 'Repositório',
                url: '#',
            },
        ],
    },
]

export default function Projects() {
    return (
        <div className="d-flex flex-column align-items-center" style={{ gap: '7rem' }}>
            {projects.map((project, index) => (
                <Project key={project.id} project={project} isEven={index % 2 === 0} />
            ))}
            <Button variant="outline-secondary" size="lg" className="rounded-pill">
                Carregar Mais
            </Button>
        </div>
    )
}
