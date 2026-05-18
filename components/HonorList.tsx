import { HonorType } from '@/types'
import { Image as BsImage, Button, Card, Col, Row } from 'react-bootstrap'
import { addIncrementalIDs, addLocalizedFields, formatDate } from '@/utils'
import { useLocale, useTranslations } from 'next-intl'

const honorData: Partial<HonorType>[] = addIncrementalIDs([
    {
        slug: 'best-academic-performance',
        image: '/img/honors/best-academic-performance.webp',
    },
    {
        slug: '10/10-capstone-project',
        image: '/img/honors/best-academic-performance.webp',
    },
    {
        slug: 's',
        image: '/img/honors/best-academic-performance.webp',
    },
])

export default function HonorList() {
    const t = useTranslations('Honors')

    const honors = addLocalizedFields(t, honorData, ['name', 'description'])

    return (
        <Row xs={{ cols: 1 }} sm={{ cols: 2 }} lg={{ cols: 3 }} className="g-4">
            {honors.map(honor => (
                <Col key={honor.id}>
                    <Card className="h-100 shadow-sm position-relative scale-on-hover">
                        <Card.Img variant="top" src={honor.image} />
                        <Card.Body className="d-flex flex-column justify-content-between align-items-start gap-4">
                            <div>
                                <Card.Title as="h3" className="h5 fw-medium">
                                    {honor.name}
                                </Card.Title>
                                <Card.Text>{honor.description}</Card.Text>
                            </div>
                            <a href="#" className="link-info text-decoration-none stretched-link">
                                <span className="external-link">{t('viewDetails')}</span>
                            </a>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}
