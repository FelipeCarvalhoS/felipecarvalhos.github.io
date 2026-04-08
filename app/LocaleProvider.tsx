'use client'

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import en from '@/locales/en.json'
import pt_BR from '@/locales/pt-BR.json'

type Locale = 'pt-BR' | 'en'
type LocaleContextType = {
    locale: Locale
    t: Record<string, any>
}

const translations = { 'pt-BR': pt_BR, en: en }

export const LocaleContext = createContext<LocaleContextType | null>(null)
export const SetLocaleContext = createContext<Dispatch<SetStateAction<Locale>> | null>(null)

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>('pt-BR')
    const t = translations[locale]

    useEffect(
        function updateHTMLTagLangProperty() {
            document.documentElement.lang = locale
        },
        [locale],
    )

    return (
        <LocaleContext value={{ locale, t }}>
            <SetLocaleContext value={setLocale}>{children}</SetLocaleContext>
        </LocaleContext>
    )
}

export function useLocale() {
    const context = useContext(LocaleContext)

    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider')
    }

    return context
}

export function useSetLocale() {
    const context = useContext(SetLocaleContext)

    if (!context) {
        throw new Error('useSetLocale must be used within a LocaleProvider')
    }

    return context
}
