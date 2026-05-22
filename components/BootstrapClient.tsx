'use client'

import { useEffect } from 'react'

export default function BootstrapClient() {
    useEffect(() => {
        async function initializeScrollSpy() {
            const { ScrollSpy } = await import('bootstrap')
            const body = document.body

            new ScrollSpy(body, {
                target: '#navbar',
                offset: 0,
            })

            document.querySelectorAll('[data-scrollspy-fade-triggered-by]').forEach(element => {
                const el = element as HTMLElement
                const rect = el.getBoundingClientRect()
                const aboveViewport = rect.top <= window.innerHeight
                el.dataset.scrollspyFaded = aboveViewport ? 'true' : 'false'
            })

            body.addEventListener('activate.bs.scrollspy', event => {
                const e = event as CustomEvent & { relatedTarget: HTMLElement }

                const relatedElements = document.querySelectorAll(
                    `[data-scrollspy-fade-triggered-by="${e.relatedTarget.dataset.scrollspyFadeTriggers}"]`,
                )

                relatedElements.forEach(element => {
                    const el = element as HTMLElement
                    const alreadyFaded = el.dataset.scrollspyFaded === 'true'

                    if (!alreadyFaded) {
                        el.classList.add('fade-in')
                        el.dataset.scrollspyFaded = 'true'
                    }
                })
            })
        }

        initializeScrollSpy()
    }, [])

    return null
}
