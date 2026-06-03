'use client'

import { useEffect } from 'react'

export default function BootstrapClient() {
    useEffect(() => {
        async function initializeScrollSpy() {
            // import('bootstrap')
            const { ScrollSpy } = await import('bootstrap')
            const body = document.body

            new ScrollSpy(body, {
                target: '#navbar',
            })
        }

        initializeScrollSpy()
    }, [])

    return null
}
