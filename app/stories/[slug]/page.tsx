import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getStoryBySlug } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/client'
import { PortableTextRenderer } from '@/components/story/PortableTextRenderer'
import CommentSection from '@/components/organisms/CommentSection'

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const story = await getStoryBySlug(slug)

  if (!story) {
    notFound()
  }

  // Helper to get placeholder based on story content
  const getPlaceholderImage = (s: any) => {
    const title = s.title || ''
    const craft = s.artisan?.craftType || ''

    if (title.includes('井波') || craft === 'inami-woodcarving') return '/images/placeholder_ranma.png'
    if (title.includes('和紙') || craft === 'gokayama-washi') return '/images/placeholder_washi.png'
    return '/images/hero.png'
  }

  const mainImageUrl = story.mainImage
    ? urlFor(story.mainImage).url()
    : getPlaceholderImage(story)

  const publishedDate = story.publishedAt
    ? new Date(story.publishedAt).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : null

  return (
    <article className="min-h-screen bg-stone-50">
      {/* ヒーローセクション */}
      <header className="relative h-[80vh] mb-16">
        <>
          <Image
            src={mainImageUrl}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <div className="inline-block relative p-8 md:p-12 border-y border-white/30 backdrop-blur-sm bg-black/10">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif tracking-widest leading-relaxed drop-shadow-xl">
                {story.title}
              </h1>
              {story.excerpt && (
                <p className="text-lg md:text-2xl text-stone-100 mb-8 font-medium tracking-wider">
                  {story.excerpt}
                </p>
              )}
              <div className="flex items-center justify-center gap-6 text-stone-200 text-sm tracking-widest uppercase">
                {publishedDate && (
                  <time dateTime={story.publishedAt}>{publishedDate}</time>
                )}
                {story.artisan && (
                  <>
                    <span>•</span>
                    <Link
                      href={`/artisans/${story.artisan.slug.current}`}
                      className="hover:text-white transition-colors border-b border-transparent hover:border-white"
                    >
                      職人：{story.artisan.name}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 本文コンテンツ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">

        {/* 職人情報カード (Simple & Elegant) */}
        {story.artisan && (
          <aside className="mb-16 bg-white p-8 rounded-sm shadow-xl border-t-4 border-stone-800">
            <Link
              href={`/artisans/${story.artisan.slug.current}`}
              className="group block"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {story.artisan.portrait && (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-stone-100 group-hover:border-stone-400 transition-colors">
                    <Image
                      src={urlFor(story.artisan.portrait).url()}
                      alt={story.artisan.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 text-center md:text-left">
                  <p className="text-xs text-stone-500 font-bold uppercase tracking-widest mb-2">
                    Crafted by
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 font-serif group-hover:text-stone-600 transition-colors">
                    {story.artisan.name}
                  </h2>
                  {story.artisan.philosophy && (
                    <p className="text-stone-600 leading-relaxed italic mb-4">
                      "{story.artisan.philosophy}"
                    </p>
                  )}
                  <p className="text-stone-900 font-bold text-sm inline-flex items-center gap-2 border-b border-stone-900 pb-0.5 group-hover:opacity-70">
                    詳しいプロフィールを見る
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </p>
                </div>
              </div>
            </Link>
          </aside>
        )}

        {/* Portable Textコンテンツ */}
        <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm mb-16">
          <div className="prose prose-lg prose-stone max-w-none font-serif leading-loose">
            {story.body && <PortableTextRenderer value={story.body} />}
          </div>
        </div>
      </div>

      <CommentSection targetId={story._id} targetType="story" comments={story.comments || []} />

      {/* ストーリー末尾のCTA */}
      <footer className="bg-stone-900 text-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
            この物語に共感いただけましたか？
          </h2>
          <p className="text-lg text-stone-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            南砺市の職人たちが心を込めて作る作品を、ぜひあなたの手元へ。
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/products"
              className="px-10 py-5 bg-white text-stone-900 font-bold rounded-sm hover:bg-stone-200 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              作品を探す
            </Link>
            <Link
              href="/artisans"
              className="px-10 py-5 border border-white/30 text-white font-bold rounded-sm hover:bg-white/10 transition-all duration-300"
            >
              職人を知る
            </Link>
          </div>
        </div>
      </footer>
    </article>
  )
}
