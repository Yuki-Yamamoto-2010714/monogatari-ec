'use client'

import { useCartStore } from '@/stores/cart-store'
import { Button } from '@/components/atoms/Button'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function CheckoutButton() {
  const { checkout } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    await checkout()
    router.push('/checkout/success')
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full mb-4 bg-stone-900 hover:bg-stone-800 text-white py-4 text-lg disabled:opacity-70"
      size="lg"
    >
      {loading ? '処理中...' : 'レジへ進む'}
    </Button>
  )
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="max-w-md w-full px-6 py-12 text-center bg-white rounded-sm shadow-sm border border-stone-200">
          <h1 className="text-2xl font-bold font-serif text-stone-900 mb-4">カートは空です</h1>
          <p className="text-stone-600 mb-8">
            まだ商品が追加されていません。<br />
            職人たちの作品を探しに行きませんか？
          </p>
          <Link href="/products">
            <Button className="bg-stone-900 hover:bg-stone-800 text-white w-full py-4">
              作品を探す
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-stone-900 mb-10 tracking-wide">
          ショッピングカート
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-sm shadow-sm border border-stone-200 overflow-hidden">
              {items.map((item, index) => (
                <div
                  key={item.productId}
                  className={`p-6 flex gap-6 ${index !== items.length - 1 ? 'border-b border-stone-100' : ''}`}
                >
                  {item.image && (
                    <div className="relative w-24 h-24 flex-shrink-0 bg-stone-100 rounded-sm overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold font-serif text-stone-900 text-lg">
                        {item.title}
                      </h3>
                      <p className="font-bold text-stone-900">
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center border border-stone-300 rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.productId, Math.max(0, item.quantity - 1))}
                          className="px-3 py-1 hover:bg-stone-100 text-stone-600 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x border-stone-300 text-stone-900 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-stone-100 text-stone-600 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-stone-400 hover:text-red-700 text-sm font-medium transition-colors"
                      >
                        削除する
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="text-sm text-stone-500 hover:text-stone-800 underline transition-colors"
            >
              カートを空にする
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-stone-200 rounded-sm p-8 sticky top-24 shadow-sm">
              <h2 className="text-xl font-bold font-serif text-stone-900 mb-6 pb-4 border-b border-stone-100">
                注文内容
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-stone-600">
                  <span>小計</span>
                  <span>¥{getTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>配送料</span>
                  <span className="text-stone-400">計算中</span>
                </div>
              </div>

              <div className="border-t border-stone-200 pt-6 mb-8">
                <div className="flex justify-between text-xl font-bold text-stone-900 font-serif">
                  <span>合計 (税込)</span>
                  <span>¥{getTotal().toLocaleString()}</span>
                </div>
              </div>

              <CheckoutButton />

              <Link href="/products">
                <Button variant="outline" className="w-full border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900">
                  買い物を続ける
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-xs text-stone-400 leading-relaxed text-center">
              ※ 本サイトはデモサイトです。<br />実際の決済は行われません。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
