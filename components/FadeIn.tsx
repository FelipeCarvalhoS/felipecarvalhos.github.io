import { useAnimate } from 'motion/react'
import { useEffect, useEffectEvent, useRef } from 'react'

const FADE_DURATION = 0.5
const FADE_HIDDEN = { opacity: 0, y: 50 }
const FADE_VISIBLE = { opacity: 1, y: 0 }

export default function FadeInWhenInView({ children }: { children: React.ReactNode }) {
    const [scope, animate] = useAnimate<HTMLDivElement>()
    const faded = useRef(false)

    const onMount = useEffectEvent(() => {
        const footer_height = document.getElementById('footer')!.offsetHeight
        const el = scope.current
        let viewportMarginBottom = 0

        function isInOrAboveViewport() {
            const rect = el.getBoundingClientRect()
            return rect.top <= window.innerHeight + viewportMarginBottom
        }

        function cannotReachMarginBottom() {
            return el.offsetHeight + footer_height < Math.abs(viewportMarginBottom)
        }

        if (isInOrAboveViewport() || cannotReachMarginBottom()) {
            faded.current = true
        } else {
            animate(scope.current, FADE_HIDDEN, { duration: FADE_DURATION })
        }

        viewportMarginBottom = -150

        function updateFade() {
            if (faded.current) return

            if (isInOrAboveViewport() || cannotReachMarginBottom()) {
                animate(scope.current, FADE_VISIBLE, { duration: FADE_DURATION })
                faded.current = true
            }
        }

        window.addEventListener('scroll', updateFade)
        window.addEventListener('resize', updateFade)

        el.addEventListener('focusin', () => {
            if (faded.current) return

            animate(scope.current, FADE_VISIBLE, { duration: FADE_DURATION })
            faded.current = true
        })
    })

    useEffect(() => {
        onMount()
    }, [])

    return <div ref={scope}>{children}</div>
}
