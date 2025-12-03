'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'

interface ScrollySectionProps {
  value: {
    backgroundImage: any
    content: any[]
    animationType: 'parallax-zoom' | 'fade' | 'slide'
  }
}

export function ScrollySection({ value }: ScrollySectionProps) {
  const { backgroundImage, content, animationType } = value
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  if (!backgroundImage) {
    return null
  }

  const imageUrl = urlFor(backgroundImage).url()

  // パララックス（拡大）アニメーション
  if (animationType === 'parallax-zoom') {
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1])
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

    return (
      <section ref={ref} className="relative h-[150vh] my-16">
        {/* 固定された背景画像 */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ scale }} className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt="Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </div>

        {/* スクロールで表示されるテキスト */}
        <motion.div
          style={{ opacity }}
          className="absolute top-0 left-0 right-0 h-full flex items-center justify-center"
        >
          <div className="max-w-3xl mx-auto px-8 py-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl">
            <div className="prose prose-lg prose-amber max-w-none">
              <PortableText value={content} />
            </div>
          </div>
        </motion.div>
      </section>
    )
  }

  // フェードインアニメーション
  if (animationType === 'fade') {
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

    return (
      <section ref={ref} className="relative h-[120vh] my-16">
        <div className="sticky top-0 h-screen">
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt="Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <motion.div
            style={{ opacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="max-w-4xl mx-auto px-8">
              <div className="prose prose-xl prose-invert max-w-none text-white">
                <PortableText value={content} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  // スライドインアニメーション
  if (animationType === 'slide') {
    const x = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, 100])
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

    return (
      <section ref={ref} className="relative h-[120vh] my-16">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt="Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          </div>

          <motion.div
            style={{ x, opacity }}
            className="absolute inset-0 flex items-center"
          >
            <div className="max-w-2xl ml-16 px-8 py-12 bg-white rounded-2xl shadow-2xl">
              <div className="prose prose-lg prose-amber max-w-none">
                <PortableText value={content} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return null
}
