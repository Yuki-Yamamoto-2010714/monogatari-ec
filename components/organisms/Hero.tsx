'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

export const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    })

    // Parallax and Opacity effects
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
            {/* Background Image with Parallax */}
            <motion.div style={{ y, opacity }} className="absolute inset-0">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: 'easeOut' }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="/images/hero.png"
                        alt="Traditional Woodcarving"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Darker overlay for better text visibility */}
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30" />
                </motion.div>
            </motion.div>

            {/* Content - Switch between Horizontal (Mobile) and Vertical (Desktop) */}
            <div className="relative z-10 h-full flex flex-col md:flex-row-reverse items-center justify-center gap-6 md:gap-32 p-4 md:p-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="md:writing-vertical-rl text-center md:text-left text-white"
                >
                    <h1 className="text-3xl md:text-7xl font-bold tracking-widest leading-relaxed md:leading-loose drop-shadow-lg font-serif">
                        職人の想いを、<br className="block md:hidden" />
                        あなたのもとへ
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="md:writing-vertical-rl text-center md:text-left text-white/90"
                >
                    <p className="text-sm md:text-xl tracking-widest leading-loose font-serif">
                        南砺の伝統と、<br className="block md:hidden" />
                        まだ見ぬ物語に出会う旅。
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
            >
                <div className="flex flex-col items-center gap-2 animate-bounce">
                    <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
                    <div className="w-[1px] h-12 bg-white/50" />
                </div>
            </motion.div>
        </section>
    )
}
