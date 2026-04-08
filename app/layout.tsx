import '@/styles/fonts.scss'
import '@/styles/main.scss'
import { Metadata } from 'next'
import { preload } from 'react-dom'
import Navbar from '@/components/Navbar'
import LocaleProvider from '@/app/LocaleProvider'

export const metadata: Metadata = {
    title: {
        template: '%s | Felipe Carvalho',
        default: 'Felipe Carvalho',
    },
    description: 'Portfólio de Felipe Carvalho',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    preload('/fonts/fredoka.ttf', { as: 'font' })
    preload('/fonts/plus_jakarta_sans.ttf', { as: 'font' })

    return (
        <LocaleProvider>
            <html lang="pt-BR">
                <body className="bg-body-secondary">
                    <Navbar />
                    {children}
                </body>
            </html>
        </LocaleProvider>
    )
}
