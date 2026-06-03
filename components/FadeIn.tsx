import { useAnimate } from 'motion/react'
import { useEffect, useEffectEvent, useRef } from 'react'

export default function FadeIn({ children }: { children: React.ReactNode }) {
    const [scope, animate] = useAnimate()
    const faded = useRef(false)

    const onMount = useEffectEvent(() => {
        const el = scope.current

        function isInOrAboveViewport() {
            const rect = el.getBoundingClientRect()
            return rect.top <= window.innerHeight
        }

        if (isInOrAboveViewport()) {
            faded.current = true
        } else {
            animate(scope.current, { opacity: 0, y: 50 }, { duration: 0.5 })
        }

        window.addEventListener('scroll', () => {
            if (faded.current) return

            if (isInOrAboveViewport()) {
                animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.5 })
                faded.current = true
            }
        })
    })

    useEffect(() => {
        onMount()
    }, [])

    return <div ref={scope}>{children}</div>
}
