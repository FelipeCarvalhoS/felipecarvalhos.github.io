import { TargetAndTransition, Transition } from 'motion'

export class Fade {
    static duration: number = 0.5
    static hidden: TargetAndTransition = { opacity: 0, y: 50 }
    static visible: TargetAndTransition = { opacity: 1, y: 0 }
    static viewportMarginBottomPixels: number = -150

    static in = {
        transition: { ease: 'easeOut', duration: Fade.duration } as Transition,
    }

    static out = {
        transition: { ease: 'easeIn', duration: Fade.duration } as Transition,
    }
}
