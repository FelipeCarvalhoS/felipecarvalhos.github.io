import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
    reactCompiler: true,
    reactStrictMode: true,
    sassOptions: {
        implementation: 'sass',
    },
    output: 'export',
}

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

export default withNextIntl(nextConfig)
