import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { urlFor } from '@/lib/sanity/client'
import { Button } from '../atoms/Button'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

// Helper to get placeholder based on product data
const getPlaceholderImage = (product: Product) => {
  const title = product.title || ''
  const slug = product.slug?.current || ''

  if (title.includes('欄間') || slug.includes('ranma')) return '/images/placeholder_ranma.png'
  if (title.includes('便箋') || title.includes('和紙') || slug.includes('washi')) return '/images/placeholder_washi.png'
  return '/images/placeholder_plate.png'
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(400).height(400).url()
    : getPlaceholderImage(product)

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link href={`/products/${product.slug.current}`}>
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!product.images?.[0] && (
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">売り切れ</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.slug.current}`}>
          {product.category && (
            <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">
              {{
                'sculpture': '彫刻',
                'washi-products': '和紙製品',
                'textiles': '織物',
                'other': 'その他'
              }[product.category] || product.category}
            </p>
          )}
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-stone-900 hover:text-stone-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        {product.artisan && (
          <Link
            href={`/artisans/${product.artisan.slug.current}`}
            className="text-sm text-black hover:text-stone-700 mb-2 inline-block font-bold"
          >
            職人: {product.artisan.name}
          </Link>
        )}

        <p className="text-sm text-stone-700 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-stone-900">
            ¥{product.price.toLocaleString()}
          </span>

          {onAddToCart && (
            <Button
              size="sm"
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
            >
              カートへ
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
