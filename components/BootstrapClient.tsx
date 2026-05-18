'use client'

import { useEffect } from 'react'

export default function BootstrapClient() {
    useEffect(() => {
        async function initializeScrollSpy() {
            const { ScrollSpy } = await import('bootstrap')

            const dataSpyList = document.querySelectorAll('[data-bs-spy="scroll"]')

            dataSpyList.forEach(dataSpyEl => {
                new ScrollSpy(dataSpyEl, {
                    target: '#navbar',
                    offset: 0,
                })
            })
        }

        initializeScrollSpy()
    }, [])

    return null
}
