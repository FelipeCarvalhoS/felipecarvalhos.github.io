import { routing } from '@/i18n/routing'
import { redirect } from '@/i18n/navigation'

export default function RootPage() {
    return redirect({ href: '/', locale: routing.defaultLocale })
}
