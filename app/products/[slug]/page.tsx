import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/sanity/queries'
import { Button } from '@/components/atoms/Button'
import { PortableText } from '@portabletext/react'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-white pb-32 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Column: Image Gallery (60%) */}
          <div className="md:col-span-7 flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full overflow-hidden bg-gray-100 rounded-sm">
              {product.images?.[0] ? (
                <Image
                  src={product.images[0].asset.url}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                // Fallback Image Logic
                <Image
                  src={
                    (product.title?.includes('欄間') || product.slug?.current?.includes('ranma')) ? '/images/placeholder_ranma.png' :
                      (product.title?.includes('便箋') || product.title?.includes('和紙') || product.slug?.current?.includes('washi')) ? '/images/placeholder_washi.png' :
                        '/images/placeholder_plate.png'
                  }
                  alt="No image available"
                  fill
                  className="object-cover opacity-90"
                  priority
                />
              )}
            </div>
            {/* Thumbnails (Grid) */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {product.images.slice(1).map((image: any, i: number) => (
                  <div key={i} className="relative aspect-square w-full overflow-hidden bg-gray-100 rounded-sm">
                    <Image
                      src={image.asset.url}
                      alt={`${product.title} - view ${i + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Key Info (40%) - Sticky on Desktop */}
          <div className="md:col-span-5 relative">
            <div className="md:sticky md:top-24 flex flex-col gap-8">
              {/* Artisan Info */}
              {product.artisan && (
                <Link href={`/artisans/${product.artisan.slug.current}`} className="flex items-center gap-3 group">
                  {product.artisan.portrait?.asset?.url && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                      <Image
                        src={product.artisan.portrait.asset.url}
                        alt={product.artisan.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-stone-500 mb-0.5 font-medium">Crafted by</p>
                    <p className="font-serif text-lg text-stone-900 border-b border-transparent group-hover:border-stone-900 transition-colors inline-block font-bold">
                      {product.artisan.name}
                    </p>
                  </div>
                </Link>
              )}

              {/* Title & Price */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4 leading-tight text-black">
                  {product.title}
                </h1>
                <p className="text-2xl text-stone-900 font-medium">
                  ¥{product.price?.toLocaleString()} <span className="text-sm text-stone-500 font-normal">(税込)</span>
                </p>
              </div>

              {/* Description */}
              <div className="prose prose-stone">
                {product.description ? (
                  <div className="whitespace-pre-wrap text-stone-800 leading-relaxed font-medium">
                    {product.description}
                  </div>
                ) : (
                  <p className="text-stone-400 italic">No description available.</p>
                )}
              </div>

              {/* Narrative Description (if exists) */}
              {product.narrativeDescription && (
                <div className="bg-stone-50 p-6 rounded-sm border border-stone-100">
                  <h3 className="font-serif font-bold mb-3 flex items-center gap-2 text-stone-900">
                    <span className="w-8 h-[1px] bg-stone-400"></span>
                    ものがたり
                  </h3>
                  <div className="prose prose-sm prose-stone text-stone-700">
                    <PortableText value={product.narrativeDescription} />
                  </div>
                </div>
              )}

              {/* Desktop CTA */}
              <div className="hidden md:block pt-8 border-t border-gray-100">
                <Button size="lg" className="w-full text-lg py-6 rounded-full bg-gray-900 hover:bg-gray-800 text-white shadow-lg transform active:scale-95 transition-all">
                  カートに入れる
                </Button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  通常 3-5 営業日以内に発送
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar (Fitts's Law) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-4 max-w-lg mx-auto">
          <div className="flex-1">
            <p className="text-xs text-gray-500">{product.title}</p>
            <p className="font-bold">¥{product.price?.toLocaleString()}</p>
          </div>
          <Button className="flex-1 py-6 rounded-full bg-gray-900 text-white shadow-md">
            カートに入れる
          </Button>
        </div>
      </div>
    </div>
  )
}
