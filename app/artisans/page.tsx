import { getAllArtisans } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/client'
import Image from 'next/image'
import Link from 'next/link'

// Helper to get placeholder based on craft type
const getPlaceholderImage = (artisan: any) => {
  const craft = artisan.craftType || ''
  const name = artisan.name || ''

  if (craft === 'inami-woodcarving' || name.includes('井波')) return '/images/placeholder_ranma.png'
  if (craft === 'gokayama-washi' || name.includes('和紙')) return '/images/placeholder_washi.png'
  return '/images/placeholder_plate.png'
}

export default async function ArtisansPage() {
  const artisans = await getAllArtisans()

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-stone-900 mb-6 tracking-wide">
            匠たち
          </h1>
          <p className="text-lg text-stone-600 font-medium max-w-2xl mx-auto leading-relaxed">
            数百年の伝統を受け継ぎ、<br />
            日々の研鑽の末に生み出される「本物」を作り手たち。
          </p>
        </div>

        {artisans.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-sm p-12 text-center max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-stone-800 mb-4">職人が登録されていません</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artisans.map((artisan: any) => (
              <Link
                key={artisan._id}
                href={`/artisans/${artisan.slug.current}`}
                className="group bg-white rounded-sm shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-stone-100"
              >
                <div className="relative h-80 w-full overflow-hidden bg-stone-200 grayscale group-hover:grayscale-0 transition-all duration-700">
                  {artisan.portrait ? (
                    <Image
                      src={urlFor(artisan.portrait).width(600).height(800).url()}
                      alt={artisan.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <Image
                      src={getPlaceholderImage(artisan)}
                      alt={artisan.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale"
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-80" />

                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <p className="text-xs font-bold tracking-widest uppercase mb-2 opacity-80 border-b border-white/30 inline-block pb-1">
                      {artisan.craftType === 'inami-woodcarving' ? '井波彫刻' :
                        artisan.craftType === 'gokayama-washi' ? '五箇山和紙' : 'Traditional Craft'}
                    </p>
                    <h2 className="text-3xl font-bold font-serif mb-1">
                      {artisan.name}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-stone-600 line-clamp-3 leading-relaxed italic text-sm">
                    "{artisan.philosophy}"
                  </p>
                  <div className="mt-6 text-right">
                    <span className="text-sm font-bold text-stone-900 border-b border-stone-900 pb-0.5 group-hover:text-stone-600 group-hover:border-stone-600 transition-colors">
                      View Profile
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
