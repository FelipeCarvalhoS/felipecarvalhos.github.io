'use client'

import { LanguageType } from '@/types'
import { Image as BsImage } from 'react-bootstrap'
import { addIncrementalIDs, formatDate } from '@/utils'
import { useLocale, useTranslations } from 'next-intl'
import { Fragment } from 'react'
import Attachment from './Attachment'

export default function LanguageList() {
    const t = useTranslations('Languages')
    const locale = useLocale()

    const languages: LanguageType[] = addIncrementalIDs<LanguageType>([
        {
            slug: 'english',
            name: t('english.name'),
            proficiency: t('english.proficiency'),
            flags: ['/img/languages/flag-us.webp', '/img/languages/flag-uk.webp'],
            certificates: [
                {
                    name: 'TOEIC Listening & Reading - Score 940',
                    issued_at: new Date('June 2025'),
                    url: '/img/languages/TOEIC-2025-Certificate.webp',
                },
                {
                    name: 'TOEIC Listening & Reading - Score 950',
                    issued_at: new Date('April 2023'),
                    url: '/img/languages/TOEIC-2023-Certificate.webp',
                },
            ],
        },
        {
            slug: 'portuguese',
            name: t('portuguese.name'),
            proficiency: t('portuguese.proficiency'),
            flags: ['/img/languages/flag-br.webp'],
            certificates: [],
        },
    ])

    return (
        <div className="vstack gap-4">
            {languages.map(language => (
                <div key={language.id} className="bg-body border px-4 py-3 rounded-3">
                    <div className="rounded-3 d-flex flex-wrap gap-4 align-items-center">
                        <div
                            className="d-block d-sm-block"
                            style={{ flexBasis: 'min(22vw, 6.25rem)' }}
                        >
                            <div
                                className="ratio position-relative"
                                style={{ aspectRatio: '104 / 73' }}
                            >
                                {language.flags.length === 2 ? (
                                    <>
                                        <BsImage
                                            className="object-fit-contain rounded-3 position-absolute top-0 start-0"
                                            src={language.flags[0]}
                                            style={{ clipPath: 'polygon(100% 0, 0% 100%, 0 0)' }}
                                            alt=""
                                        />
                                        <BsImage
                                            className="object-fit-contain rounded-3 position-absolute top-0 start-0"
                                            src={language.flags[1]}
                                            style={{
                                                clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)',
                                            }}
                                            alt=""
                                        />
                                    </>
                                ) : (
                                    <BsImage
                                        className="object-fit-contain rounded-3"
                                        src={language.flags[0]}
                                        alt=""
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-base fs-5 fw-semibold mb-2">{language.name}</h3>
                            <div>{language.proficiency}</div>
                        </div>
                    </div>
                    {language.certificates.map((certificate, index) => (
                        <Fragment key={index}>
                            <div className="mt-4 d-flex justify-content-between align-items-center flex-wrap row-gap-2 column-gap-4">
                                <div>
                                    <h4 className="font-base fs-6 fw-semibold mb-2">
                                        {certificate.name}
                                    </h4>
                                    <div>
                                        {t('issuedIn', {
                                            date: formatDate(certificate.issued_at, locale, 'long'),
                                        })}
                                    </div>
                                </div>
                                <Attachment
                                    attachment={{
                                        url: certificate.url,
                                        label: t('getCertificate'),
                                        type: 'image',
                                    }}
                                    alt={certificate.name}
                                />
                            </div>
                        </Fragment>
                    ))}
                </div>
            ))}
        </div>
    )
}
