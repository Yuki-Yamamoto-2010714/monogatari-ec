import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getStoryBySlug } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/client'
import { PortableTextRenderer } from '@/components/story/PortableTextRenderer'

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

  const mainImageUrl = story.mainImage
    ? urlFor(story.mainImage).url()
    : null

  const publishedDate = story.publishedAt
    ? new Date(story.publishedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article className="min-h-screen">
      {/* ヒーローセクション */}
      <header className="relative h-[70vh] mb-16">
        {mainImageUrl && (
          <>
            <Image
              src={mainImageUrl}
              alt={story.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
          </>
        )}

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                {story.title}
              </h1>
              {story.excerpt && (
                <p className="text-xl md:text-2xl text-white/90 mb-6 drop-shadow">
                  {story.excerpt}
                </p>
              )}
              <div className="flex items-center gap-6 text-white/80 text-sm">
                {publishedDate && (
                  <time dateTime={story.publishedAt}>{publishedDate}</time>
                )}
                {story.artisan && (
                  <>
                    <span>•</span>
                    <Link
                      href={`/artisans/${story.artisan.slug.current}`}
                      className="hover:text-white transition-colors"
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
      <div className="max-w-5xl mx-auto">
        {/* 職人情報カード */}
        {story.artisan && (
          <aside className="mx-4 sm:mx-6 lg:mx-8 mb-16">
            <Link
              href={`/artisans/${story.artisan.slug.current}`}
              className="block bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-6">
                {story.artisan.portrait && (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-amber-200">
                    <Image
                      src={urlFor(story.artisan.portrait).url()}
                      alt={story.artisan.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm text-amber-700 font-semibold mb-1">
                    この物語の職人
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {story.artisan.name}
                  </h2>
                  {story.artisan.philosophy && (
                    <p className="text-gray-700 line-clamp-2">
                      {story.artisan.philosophy}
                    </p>
                  )}
                  <p className="text-amber-700 font-semibold mt-3 flex items-center gap-2">
                    詳しいプロフィールを見る
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </Link>
          </aside>
        )}

        {/* Portable Textコンテンツ */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-amber max-w-none">
            {story.body && <PortableTextRenderer value={story.body} />}
          </div>
        </div>
      </div>

      {/* ストーリー末尾のCTA */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16">
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            この物語に共感いただけましたか？
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            南砺市の職人たちが心を込めて作る作品をぜひご覧ください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors duration-200"
            >
              商品一覧を見る
            </Link>
            <Link
              href="/artisans"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors duration-200"
            >
              職人一覧を見る
            </Link>
          </div>
        </div>
      </footer>
    </article>
  )
}
