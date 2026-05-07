import { preload } from 'react-dom'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    preload('/fonts/fredoka.ttf', { as: 'font' })
    preload('/fonts/plus_jakarta_sans.ttf', { as: 'font' })

    return children
}
