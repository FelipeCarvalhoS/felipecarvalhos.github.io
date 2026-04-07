import { Container, Stack } from 'react-bootstrap'

export default function Home() {
    return (
        <main>
            <section
                className="bg-primary hero spikes"
                style={
                    {
                        '--primary-stripe-rgb': 'var(--bs-primary-rgb)',
                        '--secondary-stripe-rgb':
                            'var(--bs-primary-darker-rgb)',
                    } as React.CSSProperties
                }
            >
                <Container
                    fluid="xxl"
                    className="d-flex justify-content-between pt-5 px-6 column-gap-5"
                    style={{
                        minHeight: 'calc(min(30vw, 26rem))',
                        paddingBottom: 'calc(3rem + var(--spike-height))',
                    }}
                >
                    <img
                        src="/img/dots.svg"
                        alt=""
                        className="align-self-end d-none d-md-block"
                    />
                    <Stack className="flex-grow-1 align-self-center text-center">
                        <span className="fs-1 fw-normal">Olá! Eu me chamo</span>
                        <div
                            className="d-flex justify-content-between align-self-center w-100"
                            style={{ maxWidth: '48rem' }}
                        >
                            <img
                                src="/img/accent-rays.svg"
                                alt=""
                                className="d-none d-xl-block"
                            />
                            <h1 className="display-1 fw-semibold text-wrap flex-grow-1">
                                Felipe Carvalho
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
                </Container>
            </section>
        </main>
    )
}
