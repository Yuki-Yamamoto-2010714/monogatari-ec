import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/atoms/Button'

export default async function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Traditional Woodcarving"
            fill
            className="object-cover"
            priority
          />
          {/* Darker overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content - Vertical Writing */}
        <div className="relative z-10 h-full flex flex-row-reverse items-center justify-center gap-16 md:gap-32 p-8 md:p-12">
          <div className="writing-vertical-rl text-white">
            <h1 className="text-5xl md:text-7xl font-bold tracking-widest leading-loose drop-shadow-lg">
              職人の想いを、<br />
              あなたのもとへ
            </h1>
          </div>
          <div className="writing-vertical-rl text-gray-50">
            <p className="text-lg md:text-xl tracking-widest leading-loose">
              南砺の伝統と、<br />
              まだ見ぬ物語に出会う旅。
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
          <span className="text-sm tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* Concept Section */}
      <section className="py-32 px-6 bg-stone-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-wider text-gray-900">
            ものがたりECとは
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-looose max-w-3xl mx-auto font-serif">
            南砺市が誇る井波彫刻や五箇山和紙。<br />
            それらは単なる「モノ」ではありません。<br /><br />
            数百年の歴史、職人の研ぎ澄まされた哲学、そして幾多の試行錯誤。<br />
            私たちは、そんな「背景にある物語」ごとお届けします。
          </p>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Story Card */}
          <Link href="/stories" className="group relative h-[60vh] overflow-hidden rounded-sm shadow-xl">
            <div className="absolute inset-0 bg-gray-900 transition-transform duration-700 group-hover:scale-105">
              {/* Placeholder for Story Image - can use simple div color if image missing */}
              <div className="w-full h-full bg-gradient-to-t from-gray-900 to-gray-700 opacity-80 group-hover:opacity-70 transition-opacity" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
              <h3 className="text-4xl font-bold mb-4 tracking-widest border-b border-white/30 pb-4">物語を読む</h3>
              <p className="text-lg text-gray-200 tracking-wider">職人の人生に触れる</p>
              <span className="mt-8 px-6 py-2 border border-white/50 rounded-full text-sm hover:bg-white hover:text-gray-900 transition-colors">
                View Stories
              </span>
            </div>
          </Link>

          {/* Product Card */}
          <Link href="/products" className="group relative h-[60vh] overflow-hidden rounded-sm shadow-xl">
            <div className="absolute inset-0 bg-stone-800 transition-transform duration-700 group-hover:scale-105">
              <div className="w-full h-full bg-gradient-to-t from-stone-900 to-stone-600 opacity-80 group-hover:opacity-70 transition-opacity" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
              <h3 className="text-4xl font-bold mb-4 tracking-widest border-b border-white/30 pb-4">商品を探す</h3>
              <p className="text-lg text-gray-200 tracking-wider">匠の技を手にする</p>
              <span className="mt-8 px-6 py-2 border border-white/50 rounded-full text-sm hover:bg-white hover:text-gray-900 transition-colors">
                View Products
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-4 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-400 mb-6 tracking-widest">Nanto City, Toyama</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-12 font-serif leading-tight">
            伝統を、<br />未来へつなぐ。
          </h2>
          <Link
            href="/products"
            className="inline-block bg-white text-gray-900 hover:bg-gray-200 px-12 py-6 text-lg rounded-full font-medium transition-colors duration-200"
          >
            すべての作品を見る
          </Link>
        </div>
      </section>
    </div>
  )
}
