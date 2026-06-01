'use client'

import { useEffect } from 'react'

export default function BootstrapClient() {
    useEffect(() => {
        async function initializeScrollSpy() {
            const { ScrollSpy } = await import('bootstrap')
            const body = document.body

            new ScrollSpy(body, {
                target: '#navbar',
                rootMargin: '0px 0px 0px',
            })

            function alreadyFaded(element: Element) {
                return (element as HTMLElement).dataset.scrollspyFaded === 'true'
            }

            document.querySelectorAll('[data-scrollspy-fade-triggered-by]').forEach(element => {
                const el = element as HTMLElement
                const rect = el.getBoundingClientRect()
                const aboveViewport = rect.top <= window.innerHeight
                el.dataset.scrollspyFaded = aboveViewport ? 'true' : 'false'

                el.addEventListener('focusin', () => {
                    if (!alreadyFaded(el)) {
                        el.classList.add('fade-in')
                        el.dataset.scrollspyFaded = 'true'
                    }
                })
            })

            body.addEventListener('activate.bs.scrollspy', event => {
                const e = event as CustomEvent & { relatedTarget: HTMLElement }

                const relatedElements = document.querySelectorAll(
                    `[data-scrollspy-fade-triggered-by="${e.relatedTarget.dataset.scrollspyFadeTriggers}"]`,
                )

                relatedElements.forEach(element => {
                    const el = element as HTMLElement

                    if (!alreadyFaded(el)) {
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
