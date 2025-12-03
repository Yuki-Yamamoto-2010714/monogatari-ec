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

export function ProductEmbed({ value }: ProductEmbedProps) {
  const { product, layout, caption } = value
  const addItem = useCartStore((state) => state.addItem)

  if (!product) {
    return null
  }

  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).url()
    : '/placeholder.jpg'

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
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-64 md:h-full">
              <Image
                src={imageUrl}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h3>
                {product.shortDescription && (
                  <p className="text-gray-600 mb-4">
                    {product.shortDescription}
                  </p>
                )}
                <p className="text-3xl font-bold text-amber-700 mb-6">
                  ¥{product.price.toLocaleString()}
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleAddToCart} className="flex-1">
                  カートに追加
                </Button>
                <Link href={`/products/${product.slug.current}`}>
                  <Button variant="outline" className="w-full">
                    詳細を見る
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {caption && (
            <p className="px-6 pb-4 text-sm text-gray-600 italic">{caption}</p>
          )}
        </div>
      </div>
    )
  }

  // 大型フィーチャーレイアウト
  if (layout === 'hero') {
    return (
      <div className="my-16 not-prose">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative h-96">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-4xl font-bold mb-3">{product.title}</h3>
              {product.shortDescription && (
                <p className="text-xl mb-4">{product.shortDescription}</p>
              )}
              <p className="text-5xl font-bold mb-6">
                ¥{product.price.toLocaleString()}
              </p>
              <div className="flex gap-4">
                <Button onClick={handleAddToCart} size="lg">
                  カートに追加
                </Button>
                <Link href={`/products/${product.slug.current}`}>
                  <Button variant="outline" size="lg">
                    詳細を見る
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {caption && (
            <p className="px-8 py-4 text-gray-700 text-center italic">
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
      <div className="float-right ml-6 mb-6 w-full md:w-96 not-prose">
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="relative h-48">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {product.title}
            </h3>
            <p className="text-2xl font-bold text-amber-700 mb-3">
              ¥{product.price.toLocaleString()}
            </p>
            <Button onClick={handleAddToCart} className="w-full mb-2">
              カートに追加
            </Button>
            <Link href={`/products/${product.slug.current}`}>
              <Button variant="outline" className="w-full">
                詳細を見る
              </Button>
            </Link>
            {caption && (
              <p className="text-sm text-gray-600 mt-3 italic">{caption}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return null
}
