import { getAllStories } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/client'
import Image from 'next/image'
import Link from 'next/link'

export default async function StoriesPage() {
  const stories = await getAllStories()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">職人の物語</h1>
        <p className="text-lg text-gray-600">
          伝統工芸品に込められた想いと、職人たちの人生を綴った物語
        </p>
      </div>

      {stories.length === 0 ? (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">ストーリーを作成してください</h2>
          <p className="text-gray-700 mb-4">
            Sanityスタジオでストーリー記事を作成すると、スクローリーテリング機能とともにここに表示されます。
          </p>
          <p className="text-sm text-gray-600">
            ストーリーには商品の埋め込みや、スクロール連動の演出を追加できます。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story: any) => (
            <Link
              key={story._id}
              href={`/stories/${story.slug.current}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {story.mainImage && (
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={urlFor(story.mainImage).width(400).height(300).url()}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-6">
                {story.artisan && (
                  <div className="text-sm text-gray-500 mb-2">
                    {story.artisan.craftType === 'inami-woodcarving' && '井波彫刻'}
                    {story.artisan.craftType === 'gokayama-washi' && '五箇山和紙'}
                    {story.artisan.craftType === 'silk-weaving' && '絹織物'}
                    {story.artisan.name && ` / ${story.artisan.name}`}
                  </div>
                )}
                <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                  {story.title}
                </h2>
                {story.excerpt && (
                  <p className="text-gray-600 line-clamp-3">{story.excerpt}</p>
                )}
                {story.publishedAt && (
                  <p className="text-sm text-gray-400 mt-4">
                    {new Date(story.publishedAt).toLocaleDateString('ja-JP')}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
