import { getAllArtisans } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/client'
import Image from 'next/image'
import Link from 'next/link'

export default async function ArtisansPage() {
  const artisans = await getAllArtisans()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">職人紹介</h1>
        <p className="text-lg text-gray-600">
          伝統の技を受け継ぎ、作品に魂を込める職人たちをご紹介します
        </p>
      </div>

      {artisans.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">コンテンツを作成してください</h2>
          <p className="text-gray-700">
            Sanityスタジオで職人のプロフィールを作成すると、ここに表示されます。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map((artisan: any) => (
            <Link
              key={artisan._id}
              href={`/artisans/${artisan.slug.current}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {artisan.portrait && (
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={urlFor(artisan.portrait).width(400).height(300).url()}
                    alt={artisan.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {artisan.craftType === 'inami-woodcarving' && '井波彫刻'}
                  {artisan.craftType === 'gokayama-washi' && '五箇山和紙'}
                  {artisan.craftType === 'silk-weaving' && '絹織物'}
                  {artisan.craftType === 'other' && 'その他'}
                </div>
                <h2 className="text-2xl font-bold mb-3">{artisan.name}</h2>
                <p className="text-gray-600 line-clamp-3">{artisan.philosophy}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
