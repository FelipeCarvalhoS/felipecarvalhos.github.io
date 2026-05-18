import '@/styles/fonts.scss'
import '@/styles/main.scss'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { routing } from '@/i18n/routing'
import { Locale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import BootstrapClient from '@/components/BootstrapClient'

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
        routing.locales.map(locale => [locale, `http://localhost:3000/${locale}`]), // TODO: use actual domain from env
    )

    return {
        title: title,
        description: t('description'),

        alternates: {
            canonical: 'http://localhost:3000',
            languages: languages,
        },
    }
}

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }))
}

type Props = {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params
    setRequestLocale(locale)

    return (
        <html lang={locale}>
            <body className="bg-body-secondary" data-bs-spy="scroll">
                <BootstrapClient />
                <NextIntlClientProvider>
                    <Navbar />
                    {children}
                    <footer>
                        <div className="bg-body text-center text-body-secondary py-4 small border border-top">
                            &copy; {new Date().getFullYear()} Felipe de Carvalho Santos
                        </div>
                    </footer>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
