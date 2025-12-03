'use client'

import { useCartStore } from '@/stores/cart-store'
import { Button } from '@/components/atoms/Button'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">カートは空です</h1>
          <p className="text-gray-600 mb-8">
            商品を追加してショッピングを始めましょう
          </p>
          <Link href="/products">
            <Button>商品を見る</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">ショッピングカート</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4"
            >
              {item.image && (
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}

              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">
                  ¥{item.price.toLocaleString()}
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x border-gray-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    削除
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg">
                  ¥{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            カートを空にする
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">注文サマリー</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>小計</span>
                <span>¥{getTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>配送料</span>
                <span>¥0</span>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>合計</span>
                <span>¥{getTotal().toLocaleString()}</span>
              </div>
            </div>

            <Button className="w-full mb-4" size="lg">
              チェックアウト
            </Button>

            <Link href="/products">
              <Button variant="outline" className="w-full">
                買い物を続ける
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
