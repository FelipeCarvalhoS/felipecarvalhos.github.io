'use client'

import { useAnimate } from 'motion/react'
import { useEffect, useEffectEvent, useRef } from 'react'
import { Fade } from '@/constants'

export default function FadeInWhenInView({ children }: { children: React.ReactNode }) {
    const [scope, animate] = useAnimate<HTMLDivElement>()
    const faded = useRef(false)

    const onMount = useEffectEvent(() => {
        const footerHeight = document.getElementById('footer')!.offsetHeight
        const el = scope.current
        let viewportMarginBottom = 0

        function isInOrAboveViewport() {
            const rect = el.getBoundingClientRect()
            return rect.top <= window.innerHeight + viewportMarginBottom
        }

        function cannotReachMarginBottom() {
            return el.offsetHeight + footerHeight < Math.abs(viewportMarginBottom)
        }

        if (isInOrAboveViewport() || cannotReachMarginBottom()) {
            faded.current = true
        } else {
            animate(scope.current, Fade.hidden, Fade.in.transition)
        }

        viewportMarginBottom = Fade.viewportMarginBottomPixels

        function updateFade() {
            if (faded.current) return

            if (isInOrAboveViewport() || cannotReachMarginBottom()) {
                animate(scope.current, Fade.visible, Fade.in.transition)
                faded.current = true
            }
        }

        window.addEventListener('scroll', updateFade)
        window.addEventListener('resize', updateFade)

        el.addEventListener('focusin', () => {
            if (faded.current) return

            animate(scope.current, Fade.visible, Fade.in.transition)
            faded.current = true
        })
    })

    useEffect(() => {
        onMount()
    }, [])

    return <div ref={scope}>{children}</div>
}
