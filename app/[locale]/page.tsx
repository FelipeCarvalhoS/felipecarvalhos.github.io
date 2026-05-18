'use client'

import ExperienceTimeline from '@/components/ExperienceTimeline'
import ProjectList from '@/components/ProjectList'
import Felipe from '@/components/Felipe'
import StandardContainer from '@/components/StandardContainer'
import { Image as BsImage, Stack, Button } from 'react-bootstrap'
import { CSSProperties } from 'react'
import EducationList from '@/components/EducationList'
import SkillList from '@/components/SkillList'
import LanguageList from '@/components/LanguageList'
import HonorList from '@/components/HonorList'
import { useTranslations } from 'next-intl'
import { slugify } from '@/utils'

export default function Home() {
    const n = useTranslations('Navbar')
    const f = useTranslations('Files')
    const t = useTranslations('Home')

    return (
        <main>
            <section className="hero spikes">
                <StandardContainer
                    className="d-flex justify-content-between pt-5 px-md-5 px-lg-6 column-gap-5"
                    style={{
                        minHeight: 'calc(min(30vw, 26rem))',
                        paddingBottom: 'calc(3rem + var(--spike-height))',
                    }}
                >
                    <BsImage
                        src="/img/dots.svg"
                        alt=""
                        className="align-self-end d-none d-md-block"
                    />
                    <Stack className="flex-grow-1 align-self-center text-center">
                        <span className="fs-3 fw-normal">{t('hero.greeting')}</span>
                        <div
                            className="d-flex justify-content-between align-self-center w-100"
                            style={{ maxWidth: '48rem' }}
                        >
                            <BsImage
                                src="/img/accent-rays.svg"
                                alt=""
                                className="d-none d-xl-block"
                            />
                            <h1 className="display-1 text-wrap flex-grow-1 mb-0">
                                <Felipe />
                            </h1>
                            <BsImage
                                src="/img/accent-rays.svg"
                                alt=""
                                className="d-none d-xl-block"
                                style={{ transform: 'rotate(180deg)' }}
                            />
                        </div>
                    </Stack>
                    <BsImage
                        src="/img/dots.svg"
                        alt=""
                        className="align-self-start d-none d-md-block"
                    />
                </StandardContainer>
            </section>
            <section
                id={slugify(n('about'))}
                className="spikes"
                style={{ '--spike-color': 'var(--bs-tertiary-bg)' } as CSSProperties}
            >
                <StandardContainer fluid={false} style={{ paddingBlock: '6.75rem' }}>
                    <div
                        className="mx-auto d-flex flex-column-reverse gap-6 flex-lg-row justify-content-between align-items-center"
                        style={{ maxWidth: '60rem' }}
                    >
                        <div style={{ flexBasis: '50%' }}>
                            <h2 className="display-2 h1 mb-4">{t('about.title')}</h2>
                            <p className="fs-5 lh-sm mb-5">{t('about.text')}</p>
                            <Button
                                as="a"
                                target="_blank"
                                href={f('cv')}
                                variant="primary"
                                size="lg"
                                className="fs-5 rounded-pill d-flex align-items-center gap-3"
                                style={{ width: 'fit-content' }}
                            >
                                <span className="external-link">{t('about.getResume')}</span>
                            </Button>
                        </div>
                        <div>
                            <BsImage src="/img/profile.webp" alt="" fluid />
                        </div>
                    </div>
                </StandardContainer>
            </section>
            <section id={slugify(n('skills'))} className="bg-body-tertiary">
                <StandardContainer
                    fluid={false}
                    style={{ paddingTop: '7rem', paddingBottom: '8.5rem' }}
                >
                    <h2 className="display-2 text-center" style={{ marginBottom: '7rem' }}>
                        {t('skills.title')}
                    </h2>
                    <SkillList />
                </StandardContainer>
            </section>
            <section
                id={slugify(n('experience'))}
                className="spikes"
                style={
                    {
                        '--spike-color': 'var(--bs-tertiary-bg)',
                        scrollMarginTop: '6rem',
                    } as CSSProperties
                }
            >
                <div
                    className="diagonal-primary p-4 text-center"
                    style={
                        {
                            '--upper-background': 'var(--bs-tertiary-bg)',
                            '--lower-background': 'var(--bs-secondary-bg)',
                        } as CSSProperties
                    }
                >
                    <h2 className="display-2">{t('experience.title')}</h2>
                </div>
                <StandardContainer fluid="lg" style={{ paddingBlock: '8rem' }}>
                    <ExperienceTimeline />
                </StandardContainer>
            </section>
            <section
                id={slugify(n('education'))}
                className="bg-body-tertiary spikes"
                style={{ '--spike-color': 'var(--bs-secondary-bg)' } as CSSProperties}
            >
                <StandardContainer fluid="md" style={{ paddingBlock: '7rem' }}>
                    <h2 className="display-2 text-center" style={{ marginBottom: '7rem' }}>
                        {t('education.title')}
                    </h2>

                    <div className="mx-auto" style={{ maxWidth: '46rem' }}>
                        <EducationList />
                    </div>
                </StandardContainer>
            </section>
            <section
                id={slugify(n('projects'))}
                className="spikes"
                style={{ '--spike-color': 'var(--bs-tertiary-bg)' } as CSSProperties}
            >
                <StandardContainer fluid={false} style={{ paddingBlock: '7rem' }}>
                    <h2 className="display-2 text-center" style={{ marginBottom: '7rem' }}>
                        {t('projects.title')}
                    </h2>
                    <ProjectList />
                </StandardContainer>
            </section>
            <section
                id={slugify(n('languages'))}
                className="bg-body-tertiary spikes"
                style={{ '--spike-color': 'var(--bs-secondary-bg)' } as CSSProperties}
            >
                <StandardContainer fluid="md" style={{ paddingTop: '7rem', paddingBottom: '7rem' }}>
                    <h2 className="display-2 text-center" style={{ marginBottom: '7rem' }}>
                        {t('languages.title')}
                    </h2>

                    <div className="mx-auto" style={{ maxWidth: '42rem' }}>
                        <LanguageList />
                    </div>
                </StandardContainer>
            </section>
            <section id={slugify(n('honors'))}>
                <StandardContainer
                    fluid="xl"
                    style={{ paddingTop: '7rem', paddingBottom: '8.5rem' }}
                >
                    <h2 className="display-2 text-center" style={{ marginBottom: '7rem' }}>
                        {t('honors.title')}
                    </h2>

                    <div className="mx-auto">
                        <HonorList />
                    </div>
                </StandardContainer>
            </section>
            <section id={slugify(n('contact'))}>
                <div
                    className="diagonal-primary p-4 text-center"
                    style={
                        {
                            '--upper-background': 'var(--bs-tertiary-bg)',
                            '--lower-background': 'var(--bs-secondary-bg)',
                            '--skew-angle-sign': 1,
                        } as CSSProperties
                    }
                >
                    <h2 className="display-2">{t('contact.title')}</h2>
                </div>
                <StandardContainer fluid="lg" style={{ paddingBlock: '7rem' }}>
                    <div className="mx-auto" style={{ maxWidth: '42rem' }}>
                        a
                    </div>
                </StandardContainer>
            </section>
        </main>
    )
}
