import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link
                    rel="preload"
                    href="/fonts/fredoka.ttf"
                    as="font"
                    type="font/ttf"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/plus_jakarta_sans.ttf"
                    as="font"
                    type="font/ttf"
                    crossOrigin="anonymous"
                />
            </Head>
            <body className="bg-body-secondary">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
