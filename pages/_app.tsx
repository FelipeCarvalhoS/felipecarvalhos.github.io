import type { AppProps } from 'next/app'
import '@/styles/main.scss'
import { fredoka, plusJakartaSans } from '@/styles/fonts'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div
            className={`${fredoka.variable} ${plusJakartaSans.variable}`}
            style={{
                fontFamily: 'var(--font-plus-jakarta-sans)',
                display: 'contents',
            }}
        >
            <Component {...pageProps} />
        </div>
    )
}
