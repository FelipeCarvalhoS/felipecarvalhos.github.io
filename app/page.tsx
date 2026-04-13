'use client'

import { useLocale, useSetLocale } from '@/app/LocaleProvider'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import Felipe from '@/components/Felipe'
import StandardContainer from '@/components/StandardContainer'
import { Image as BsImage, Stack, Button } from 'react-bootstrap'

export default function Home() {
    const t = useLocale().t

    return (
        <main>
            <section className="bg-primary hero spikes">
                <StandardContainer
                    className="d-flex justify-content-between pt-5 px-md-5 px-lg-6 column-gap-5"
                    style={{
                        minHeight: 'calc(min(30vw, 26rem))',
                        paddingBottom: 'calc(3rem + var(--spike-height))',
                    }}
                >
                    <img src="/img/dots.svg" alt="" className="align-self-end d-none d-md-block" />
                    <Stack className="flex-grow-1 align-self-center text-center">
                        <span className="fs-3 fw-normal">{t.hero.greeting}</span>
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
            <section>
                <StandardContainer fluid={false} classNameExtra="d-flex justify-content-center">
                    <div
                        className="d-flex flex-column-reverse gap-6 flex-lg-row justify-content-between align-items-center"
                        style={{ maxWidth: '60rem' }}
                    >
                        <div style={{ flexBasis: '50%' }}>
                            <h2 className="display-2 h1 mb-4">Sobre Mim</h2>
                            <p className="fs-5 lh-sm mb-5">
                                Lorem ipsum dolor sit amet consectetur. Pellentesque lectus quis leo
                                in eu pharetra tristique. Faucibus purus blandit risus nulla tellus.
                                Arcu senectus erat dictumst nisl dui leo. Amet mi a odio elit quam
                                ultrices euismod.
                            </p>
                            <Button
                                variant="primary"
                                size="lg"
                                className="fs-5 rounded-pill d-flex align-items-center gap-3"
                            >
                                <span>Baixar currículo</span>
                                <BsImage src="/img/download.svg" alt="Download" />
                            </Button>
                        </div>
                        <div>
                            <BsImage src="/img/profile.png" alt="" fluid />
                        </div>
                    </div>
                </StandardContainer>
            </section>
            <section id="experiencia">
                <div className="diagonal-primary p-4 text-center">
                    <h2 className="display-2">Experiência</h2>
                </div>
                <StandardContainer fluid="lg" classNameExtra="py-9">
                    <ExperienceTimeline />
                </StandardContainer>
            </section>
        </main>
    )
}
