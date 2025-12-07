'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import { Button } from '@/components/atoms/Button'
import { useCartStore } from '@/stores/cart-store'

interface ProductEmbedProps {
  value: {
    product: {
      _id: string
      title: string
      slug: { current: string }
      price: number
      images: any[]
      shortDescription?: string
    }
    layout: 'standard' | 'hero' | 'float'
    caption?: string
  }
}

// Helper to get placeholder based on product data (Same logic as ProductCard)
const getPlaceholderImage = (product: any) => {
  const title = product.title || ''
  const slug = product.slug?.current || ''

  if (title.includes('欄間') || slug.includes('ranma')) return '/images/placeholder_ranma.png'
  if (title.includes('便箋') || title.includes('和紙') || slug.includes('washi')) return '/images/placeholder_washi.png'
  return '/images/placeholder_plate.png'
}

export function ProductEmbed({ value }: ProductEmbedProps) {
  const { product, layout, caption } = value
  const addItem = useCartStore((state) => state.addItem)

  if (!product) {
    return null
  }

  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).url()
    : getPlaceholderImage(product)

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      title: product.title,
      price: product.price,
      image: imageUrl,
      slug: product.slug.current,
    })
  }

  // 標準カードレイアウト
  if (layout === 'standard') {
    return (
      <div className="my-12 not-prose">
        <div className="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-stone-100">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-64 md:h-full bg-stone-50">
              <Image
                src={imageUrl}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold font-serif text-stone-900 mb-2">
                  {product.title}
                </h3>
                {product.shortDescription && (
                  <p className="text-stone-600 mb-4 leading-relaxed">
                    {product.shortDescription}
                  </p>
                )}
                <p className="text-3xl font-bold text-stone-900 mb-6">
                  ¥{product.price.toLocaleString()}
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleAddToCart} className="flex-1 bg-stone-900 hover:bg-stone-800 text-white transform hover:scale-[1.02] transition-all">
                  カートに追加
                </Button>
                <Link href={`/products/${product.slug.current}`} className="w-full">
                  <Button variant="outline" className="w-full border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900">
                    詳細を見る
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {caption && (
            <p className="px-6 pb-4 text-sm text-stone-500 italic border-t border-stone-100 mt-2 pt-2">{caption}</p>
          )}
        </div>
      </div>
    )
  }

  // 大型フィーチャーレイアウト
  if (layout === 'hero') {
    return (
      <div className="my-16 not-prose">
        <div className="bg-stone-900 rounded-sm overflow-hidden shadow-2xl relative">
          <div className="relative h-96">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-4xl font-bold font-serif mb-3 tracking-wide">{product.title}</h3>
              {product.shortDescription && (
                <p className="text-xl mb-4 text-stone-200">{product.shortDescription}</p>
              )}
              <div className="flex items-end justify-between">
                <p className="text-5xl font-bold">
                  ¥{product.price.toLocaleString()}
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleAddToCart} size="lg" className="bg-white text-stone-900 hover:bg-stone-200 border-none">
                    カートに追加
                  </Button>
                  <Link href={`/products/${product.slug.current}`}>
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                      詳細を見る
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {caption && (
            <p className="px-8 py-4 text-stone-400 text-center italic text-sm bg-stone-900">
              {caption}
            </p>
          )}
        </div>
      </div>
    )
  }

  // テキスト回り込みレイアウト
  if (layout === 'float') {
    return (
      <div className="float-right ml-8 mb-8 w-full md:w-80 not-prose">
        <div className="bg-white rounded-sm shadow-lg overflow-hidden border border-stone-100">
          <div className="relative h-56 bg-stone-50">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold font-serif text-stone-900 mb-2 leading-tight">
              {product.title}
            </h3>
            <p className="text-2xl font-bold text-stone-900 mb-4">
              ¥{product.price.toLocaleString()}
            </p>
            <Button onClick={handleAddToCart} className="w-full mb-3 bg-stone-900 hover:bg-stone-800 text-white">
              カートに追加
            </Button>
            <Link href={`/products/${product.slug.current}`}>
              <Button variant="outline" className="w-full text-sm py-2">
                詳細を見る
              </Button>
            </Link>
            {caption && (
              <p className="text-xs text-stone-500 mt-3 italic text-center">{caption}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return null
}
