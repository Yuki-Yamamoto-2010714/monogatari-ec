'use client'

import { motion } from 'framer-motion'

export function ImpactVisualization() {
    const steps = [
        {
            title: "商品購入",
            description: "あなたが作品を購入することで、物語に参加します。",
            icon: (
                <svg className="w-8 h-8 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
            color: "bg-white",
        },
        {
            title: "職人への還元",
            description: "収益の約70%が職人に直接還元され、創作活動を支えます。",
            icon: (
                <svg className="w-8 h-8 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "bg-stone-100",
        },
        {
            title: "次世代の育成",
            description: "残りの一部は、後継者育成プログラムや道具の保全に使われます。",
            icon: (
                <svg className="w-8 h-8 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            color: "bg-stone-200",
        },
        {
            title: "地域への貢献",
            description: "伝統工芸が続くことで、南砺市の文化と経済が循環し続けます。",
            icon: (
                <svg className="w-8 h-8 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "bg-stone-300",
        },
    ]

    return (
        <section className="py-24 px-6 md:px-12 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 text-stone-900">
                        想いは、循環する。
                    </h2>
                    <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
                        あなたのお買い物は、単なる消費ではありません。<br className="hidden md:block" />
                        それは、職人の技を支え、地域の伝統を未来へ繋ぐ投資です。
                    </p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-stone-200 -z-10 transform -translate-y-1/2" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className={`aspect-square md:aspect-auto md:h-64 rounded-full md:rounded-lg ${step.color} border border-stone-200 p-8 flex flex-col items-center justify-center text-center shadow-lg mx-auto w-64 md:w-auto z-10 hover:scale-105 transition-transform duration-300`}>
                                    <div className="mb-4 p-3 bg-white rounded-full shadow-sm">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-lg font-bold font-serif mb-3 text-stone-800">{step.title}</h3>
                                    <p className="text-sm text-stone-600 leading-relaxed">{step.description}</p>
                                </div>

                                {/* Arrow (Mobile) */}
                                {index < steps.length - 1 && (
                                    <div className="md:hidden flex justify-center py-4">
                                        <svg className="w-6 h-6 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-block bg-stone-900 text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide">
                        収益の70%以上が、地域と職人に還元されます
                    </div>
                </div>
            </div>
        </section>
    )
}
