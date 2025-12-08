'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/stores/cart-store'
import { Button } from '@/components/atoms/Button'

interface AddToCartButtonProps {
    product: {
        _id: string
        title: string
        price: number
        image?: string
        slug: string
    }
    className?: string
    variant?: 'primary' | 'outline'
    children?: React.ReactNode
}

export function AddToCartButton({
    product,
    className = '',
    variant = 'primary',
    children = 'カートに入れる'
}: AddToCartButtonProps) {
    const { addItem } = useCartStore()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleAddToCart = async () => {
        setIsLoading(true)

        // Add to cart
        addItem({
            productId: product._id,
            title: product.title,
            price: product.price,
            image: product.image,
            slug: product.slug
        })

        // Artificial delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500))

        // Redirect to cart
        router.push('/cart')
    }

    return (
        <Button
            onClick={handleAddToCart}
            disabled={isLoading}
            className={`${className} ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
        // If the Button component accepts variant, use it, otherwise style manually via className
        >
            {isLoading ? '追加中...' : children}
        </Button>
    )
}
