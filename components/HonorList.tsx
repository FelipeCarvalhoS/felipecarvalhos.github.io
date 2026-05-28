'use client'

import { HonorType } from '@/types'
import { Card, Col, Ratio, Row } from 'react-bootstrap'
import { addIncrementalIDs } from '@/utils'
import { useTranslations } from 'next-intl'

export default function HonorList() {
    const t = useTranslations('Honors')

    const honors: HonorType[] = addIncrementalIDs<HonorType>([
        {
            slug: 'best-academic-performance',
            name: t('best-academic-performance.name'),
            description: t('best-academic-performance.description'),
            image: '/img/honors/best-academic-performance.webp',
            attachment: {
                url: '/img/honors/best-academic-performance.webp',
                label: t('best-academic-performance.attachment.label'),
                type: 'image',
            },
        },
        {
            slug: '10-10-capstone-project',
            name: t('10-10-capstone-project.name'),
            description: t('10-10-capstone-project.description'),
            image: '/img/honors/best-academic-performance.webp',
            attachment: {
                url: '#easytalk',
                label: t('10-10-capstone-project.attachment.label'),
                type: 'link',
            },
        },
        {
            slug: 's',
            name: t('s.name'),
            description: t('s.description'),
            image: '/img/honors/best-academic-performance.webp',
        },
    ])

    return (
        <Row xs={{ cols: 1 }} sm={{ cols: 2 }} lg={{ cols: 3 }} className="g-4">
            {honors.map(honor => (
                <Col key={honor.id}>
                    <Card className="h-100 shadow-sm position-relative scale-on-hover">
                        <Ratio aspectRatio="16x9">
                            <Card.Img
                                variant="top"
                                src={honor.image}
                                className="img-fluid object-fit-cover"
                                style={{ objectPosition: '0 0' }}
                            />
                        </Ratio>
                        <Card.Body className="d-flex flex-column justify-content-between align-items-start gap-4">
                            <div>
                                <Card.Title as="h3" className="h5 fw-medium">
                                    {honor.name}
                                </Card.Title>
                                <Card.Text>{honor.description}</Card.Text>
                            </div>
                            {honor.attachment && (
                                <>
                                    {honor.attachment.type === 'link' && (
                                        <a
                                            href={honor.attachment.url}
                                            className="link-info text-decoration-none stretched-link"
                                        >
                                            <span className="external-link">
                                                {honor.attachment.label}
                                            </span>
                                        </a>
                                    )}
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}
