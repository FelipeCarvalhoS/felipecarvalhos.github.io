import { motion } from 'motion/react'

export default function FadeIn({ children }: { children: React.ReactNode }) {
    const duration = 0.5
    const yOffset = 50

    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeOut', duration: duration }}
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    )
}
