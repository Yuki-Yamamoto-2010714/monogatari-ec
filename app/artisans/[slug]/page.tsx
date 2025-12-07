import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getArtisanBySlug } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/client'
import { ProductCard } from '@/components/molecules/ProductCard'

export default async function ArtisanPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const artisan = await getArtisanBySlug(slug)

  if (!artisan) {
    notFound()
  }

  const portraitUrl = artisan.portrait ? urlFor(artisan.portrait).url() : null

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Artisan Hero */}
      <section className="relative bg-white pt-20 pb-16 px-4 border-b border-stone-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
          {portraitUrl && (
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
              <Image
                src={portraitUrl}
                alt={artisan.name}
                fill
                className="object-cover rounded-full border-4 border-stone-100 shadow-xl"
              />
            </div>
          )}
          <div className="text-center md:text-left flex-1">
            <div className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-sm font-bold tracking-widest mb-4 rounded-full">
              CRAFTSMAN PROFILE
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-stone-900 mb-6">
              {artisan.name}
            </h1>
            <p className="text-xl text-stone-600 font-serif leading-relaxed italic mb-8">
              "{artisan.philosophy}"
            </p>
            {artisan.history && (
              <div className="prose prose-stone text-stone-700">
                <p>{artisan.history}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

        {/* Products Section */}
        {artisan.products && artisan.products.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-bold font-serif text-stone-900">
                手仕事の作品
              </h2>
              <div className="h-[1px] bg-stone-300 flex-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artisan.products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Stories Section */}
        {artisan.stories && artisan.stories.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-bold font-serif text-stone-900">
                関連する物語
              </h2>
              <div className="h-[1px] bg-stone-300 flex-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {artisan.stories.map((story: any) => (
                <Link
                  key={story._id}
                  href={`/stories/${story.slug.current}`}
                  className="group relative h-80 overflow-hidden rounded-sm shadow-lg block"
                >
                  <div className="absolute inset-0">
                    {story.mainImage && (
                      <Image
                        src={urlFor(story.mainImage).url()}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <p className="text-xs tracking-widest uppercase mb-2 opacity-80">Story</p>
                    <h3 className="text-2xl font-bold font-serif mb-2 leading-tight">
                      {story.title}
                    </h3>
                    {story.excerpt && (
                      <p className="text-white/80 line-clamp-2 text-sm">
                        {story.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
