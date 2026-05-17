import { LanguageType } from '@/types'
import { Image as BsImage } from 'react-bootstrap'
import { addIncrementalIDs, addLocalizedFields, formatDate } from '@/utils'
import { useLocale, useTranslations } from 'next-intl'
import { CSSProperties } from 'react'

const languageData: Partial<LanguageType>[] = addIncrementalIDs([
    {
        slug: 'english',
        flags: ['/img/languages/flag-us.webp', '/img/languages/flag-uk.webp'],
        certificates: [
            {
                name: 'TOEIC Listening & Reading - Score 940',
                issued_at: new Date('June 2025'),
                url: '/files/toeic/TOEIC-2025-Certificate.jpg',
            },
            {
                name: 'TOEIC Listening & Reading - Score 950',
                issued_at: new Date('April 2023'),
                url: '/files/toeic/TOEIC-2023-Certificate.jpg',
            },
        ],
    },
    {
        slug: 'portuguese',
        flags: ['/img/languages/flag-br.webp'],
        certificates: [],
    },
])

export default function LanguageList() {
    const t = useTranslations('Languages')
    const locale = useLocale()

    const languages = addLocalizedFields(t, languageData, ['name', 'proficiency'])

    return (
        <div className="vstack gap-4">
            {languages.map(language => (
                <div key={language.id} className="bg-body border px-4 py-3 shadow-sm rounded-3">
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
                    {language.certificates.map(certificate => (
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
                            <a
                                href={certificate.url}
                                target="_blank"
                                className="link-info text-decoration-none d-flex align-items-center gap-2"
                            >
                                <span>{t('getCertificate')}</span>
                                <svg
                                    style={{ width: '1.25rem' }}
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                >
                                    <path d="M384 64C366.3 64 352 78.3 352 96C352 113.7 366.3 128 384 128L466.7 128L265.3 329.4C252.8 341.9 252.8 362.2 265.3 374.7C277.8 387.2 298.1 387.2 310.6 374.7L512 173.3L512 256C512 273.7 526.3 288 544 288C561.7 288 576 273.7 576 256L576 96C576 78.3 561.7 64 544 64L384 64zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 416C480 398.3 465.7 384 448 384C430.3 384 416 398.3 416 416L416 496C416 504.8 408.8 512 400 512L144 512C135.2 512 128 504.8 128 496L128 240C128 231.2 135.2 224 144 224L224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160L144 160z" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
