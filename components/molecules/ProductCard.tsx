import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { urlFor } from '@/lib/sanity/client'
import { Button } from '../atoms/Button'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(400).height(400).url()
    : '/placeholder-product.jpg'

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
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">売り切れ</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.slug.current}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-gray-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        {product.artisan && (
          <Link
            href={`/artisans/${product.artisan.slug.current}`}
            className="text-sm text-gray-600 hover:text-gray-900 mb-2 inline-block"
          >
            職人: {product.artisan.name}
          </Link>
        )}

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">
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
