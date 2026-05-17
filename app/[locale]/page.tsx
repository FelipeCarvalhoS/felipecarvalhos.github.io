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
                    <img src="/img/dots.svg" alt="" className="align-self-end d-none d-md-block" />
                    <Stack className="flex-grow-1 align-self-center text-center">
                        <span className="fs-3 fw-normal">{t('hero.greeting')}</span>
                        <div
                            className="d-flex justify-content-between align-self-center w-100"
                            style={{ maxWidth: '48rem' }}
                        >
                            <img src="/img/accent-rays.svg" alt="" className="d-none d-xl-block" />
                            <h1 className="display-1 text-wrap flex-grow-1 mb-0">
                                <Felipe />
                            </h1>
                            <img
                                src="/img/accent-rays.svg"
                                alt=""
                                className="d-none d-xl-block"
                                style={{ transform: 'rotate(180deg)' }}
                            />
                        </div>
                    </Stack>
                    <img
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
                                <span>{t('about.getResume')}</span>
                                {/* <BsImage
                                    src="/img/download.svg"
                                    alt="Download"
                                    style={{ width: '1.5rem' }}
                                /> */}
                                <svg
                                    style={{ width: '1.75rem' }}
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                >
                                    <path d="M384 64C366.3 64 352 78.3 352 96C352 113.7 366.3 128 384 128L466.7 128L265.3 329.4C252.8 341.9 252.8 362.2 265.3 374.7C277.8 387.2 298.1 387.2 310.6 374.7L512 173.3L512 256C512 273.7 526.3 288 544 288C561.7 288 576 273.7 576 256L576 96C576 78.3 561.7 64 544 64L384 64zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 416C480 398.3 465.7 384 448 384C430.3 384 416 398.3 416 416L416 496C416 504.8 408.8 512 400 512L144 512C135.2 512 128 504.8 128 496L128 240C128 231.2 135.2 224 144 224L224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160L144 160z" />
                                </svg>
                            </Button>
                        </div>
                        <div>
                            <BsImage src="/img/profile.png" alt="" fluid />
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
            <section id={slugify(n('languages'))} className="bg-body-tertiary">
                <StandardContainer fluid="md" style={{ paddingBlock: '7rem' }}>
                    <h2 className="display-2 text-center" style={{ marginBottom: '7rem' }}>
                        {t('languages.title')}
                    </h2>

                    <div className="mx-auto" style={{ maxWidth: '42rem' }}>
                        <LanguageList />
                    </div>
                </StandardContainer>
            </section>
        </main>
    )
}
