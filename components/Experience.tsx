'use client'

import { ExperienceType } from '@/types'
import { formatDate } from '@/utils'
import { useLocale } from 'next-intl'
import { Image as BsImage } from 'react-bootstrap'
import Attachment from './Attachment'

export default function Experience({
    experience,
    isFirst,
    isLast,
}: {
    experience: ExperienceType
    isFirst: boolean
    isLast: boolean
}) {
    const locale = useLocale()

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex column-gap-4 column-gap-md-5">
                <div
                    style={{ minWidth: '6.25rem' }}
                    className="d-none d-sm-flex flex-column align-items-center"
                >
                    <div
                        className={`vr text-secondary align-self-center ${isFirst ? 'opacity-0' : 'opacity-100'}`}
                        style={{ height: '1rem' }}
                    ></div>
                    <div
                        className="rounded-circle border border-secondary bg-body w-100 d-flex justify-content-center align-items-center"
                        style={{ aspectRatio: '1 / 1' }}
                    >
                        <span className="text-secondary fw-medium h5 text-center">
                            {experience.end
                                ? formatDate(experience.end, locale, 'short').split(' ')[0]
                                : locale === 'pt-br'
                                  ? 'Hoje'
                                  : 'Today'}
                            <br />
                            {experience.end &&
                                formatDate(experience.end, locale, 'short').split(' ')[1]}
                        </span>
                    </div>
                    <div
                        className={`vr text-secondary opacity-100 align-self-center flex-grow-1`}
                    ></div>
                    {isLast && (
                        <div
                            className="bg-secondary rounded-circle"
                            style={{ width: '9px', aspectRatio: '1 / 1' }}
                        ></div>
                    )}
                </div>
                <div className={`flex-grow-1 ${isLast ? 'mb-0' : 'mb-5'}`}>
                    <div className="bg-body border px-4 py-3 rounded-3 d-flex flex-wrap gap-4 align-items-center">
                        <div className="d-none d-sm-block" style={{ minWidth: '5rem' }}>
                            <div className="ratio ratio-1x1">
                                <BsImage
                                    className="object-fit-contain"
                                    src={experience.company.logo}
                                    alt={experience.company.name}
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-base fs-5 fw-semibold mb-2">{experience.title}</h3>
                            <div className="mb-2">{experience.company.name}</div>
                            <div className="text-body-secondary small">
                                <span className="text-nowrap">
                                    {formatDate(experience.start, locale, 'long')}
                                </span>{' '}
                                -{' '}
                                <span className="text-nowrap">
                                    {formatDate(experience.end, locale, 'long')}
                                </span>
                            </div>
                        </div>
                    </div>
                    <ul className="mt-4 mb-0">
                        {experience.bulletPoints.map((point, index) => (
                            <li key={index}>
                                <p
                                    className={
                                        isLast && index === experience.bulletPoints.length - 1
                                            ? 'mb-0'
                                            : undefined
                                    }
                                >
                                    {point}
                                </p>
                            </li>
                        ))}
                    </ul>
                    {experience.attachment && (
                        <div className="mt-4">
                            <Attachment attachment={experience.attachment} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
