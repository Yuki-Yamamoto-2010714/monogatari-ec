import { getAllStories } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/client'
import Image from 'next/image'
import Link from 'next/link'

// Helper to get placeholder based on story content
const getPlaceholderImage = (story: any) => {
  const title = story.title || ''
  const craft = story.artisan?.craftType || ''

  if (title.includes('井波') || craft === 'inami-woodcarving') return '/images/placeholder_ranma.png'
  if (title.includes('和紙') || craft === 'gokayama-washi') return '/images/placeholder_washi.png'
  return '/images/hero.png'
}

export default async function StoriesPage() {
  const stories = await getAllStories()

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-20">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-stone-900 mb-6 tracking-wide">
            職人の物語
          </h1>
          <p className="text-lg text-stone-600 font-medium max-w-2xl mx-auto leading-relaxed">
            伝統工芸品に込められた想いと、職人たちのひたむきな人生。<br />
            その背景にあるドラマをお届けします。
          </p>
        </div>

        {stories.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-sm p-12 text-center max-w-2xl mx-auto shadow-sm">
            <h2 className="text-2xl font-bold font-serif text-stone-800 mb-4">物語を紡いでいます...</h2>
            <p className="text-stone-600 mb-6">
              現在、新しいストーリーを準備中です。公開まで今しばらくお待ちください。
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story: any) => (
              <Link
                key={story._id}
                href={`/stories/${story.slug.current}`}
                className="group bg-white rounded-sm shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col h-full transform hover:-translate-y-1"
              >
                <div className="relative h-64 w-full overflow-hidden bg-stone-200">
                  {story.mainImage ? (
                    <Image
                      src={urlFor(story.mainImage).width(600).height(400).url()}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <Image
                      src={getPlaceholderImage(story)}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold tracking-widest text-stone-500 uppercase">
                      {story.artisan?.craftType === 'inami-woodcarving' ? '井波彫刻' :
                        story.artisan?.craftType === 'gokayama-washi' ? '五箇山和紙' : 'CRAFTSMANSHIP'}
                    </span>
                    {story.publishedAt && (
                      <time className="text-xs text-stone-600 font-medium">
                        {new Date(story.publishedAt).toLocaleDateString('ja-JP')}
                      </time>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold font-serif text-stone-900 mb-4 leading-tight group-hover:text-stone-600 transition-colors">
                    {story.title}
                  </h2>

                  {story.excerpt && (
                    <p className="text-stone-600 line-clamp-3 mb-6 flex-1 leading-relaxed">
                      {story.excerpt}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-auto pt-6 border-t border-stone-100">
                    {story.artisan?.name && (
                      <span className="text-sm text-stone-800 font-bold">
                        職人: {story.artisan.name}
                      </span>
                    )}
                    <span className="ml-auto text-stone-500 group-hover:text-stone-900 transition-colors">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
