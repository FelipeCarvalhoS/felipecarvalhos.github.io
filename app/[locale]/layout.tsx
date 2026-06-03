import '@/styles/fonts.scss'
import '@/styles/main.scss'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { routing } from '@/i18n/routing'
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import BootstrapClient from '@/components/BootstrapClient'
import Felipe from '@/components/Felipe'
import { notFound } from 'next/navigation'
import { MotionConfig } from 'motion/react'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'Metadata' })

    const title = {
        template: t('title.template'),
        default: t('title.default'),
    }

    const languages: Record<Locale, string> = Object.fromEntries(
        routing.locales.map(locale => [locale, `${process.env.SITE_URL}/${locale}`]),
    )

    return {
        title: title,
        description: t('description'),

        alternates: {
            canonical: process.env.SITE_URL,
            languages: languages,
        },
    }
}

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

    return (
        <html lang={locale}>
            <body className="bg-body-secondary">
                <BootstrapClient />
                <NextIntlClientProvider>
                    <MotionConfig reducedMotion="user">
                        <Navbar />
                        {children}
                        <footer>
                            <div className="bg-body text-center text-body-secondary py-4 small border border-top">
                                &copy; {new Date().getFullYear()} <Felipe fullName></Felipe>
                            </div>
                        </footer>
                    </MotionConfig>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
