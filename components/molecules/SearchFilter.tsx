'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react'

export function SearchFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [search, setSearch] = useState(searchParams.get('q') || '')
    const [category, setCategory] = useState(searchParams.get('category') || 'all')
    const [priceRange, setPriceRange] = useState(searchParams.get('price') || 'all')

    // Debounce search update
    useEffect(() => {
        const timer = setTimeout(() => {
            updateParams({ q: search })
        }, 500)
        return () => clearTimeout(timer)
    }, [search])

    const updateParams = useCallback((updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString())

        Object.entries(updates).forEach(([key, value]) => {
            if (value && value !== 'all') {
                params.set(key, value)
            } else {
                params.delete(key)
            }
        })

        router.push(`/products?${params.toString()}`)
    }, [router, searchParams])

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value)
        updateParams({ category: e.target.value })
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriceRange(e.target.value)
        updateParams({ price: e.target.value })
    }

    return (
        <div className="bg-white p-6 rounded-sm shadow-sm border border-stone-200 mb-8">
            <h3 className="text-lg font-serif font-bold text-stone-800 mb-4">作品を探す</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search Input */}
                <div>
                    <label className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">Keywords</label>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="商品名など..."
                        className="w-full px-3 py-2 border border-stone-300 rounded-sm focus:outline-none focus:border-stone-500 bg-stone-50 text-sm"
                    />
                </div>

                {/* Category Select */}
                <div>
                    <label className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">Category</label>
                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        className="w-full px-3 py-2 border border-stone-300 rounded-sm focus:outline-none focus:border-stone-500 bg-stone-50 text-sm"
                    >
                        <option value="all">すべてのカテゴリ</option>
                        <option value="home-decor">インテリア</option>
                        <option value="kitchen">食器・キッチン</option>
                        <option value="stationery">文房具</option>
                        <option value="textiles">織物・布製品</option>
                        <option value="accessories">アクセサリー</option>
                    </select>
                </div>

                {/* Price Select */}
                <div>
                    <label className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">Price</label>
                    <select
                        value={priceRange}
                        onChange={handlePriceChange}
                        className="w-full px-3 py-2 border border-stone-300 rounded-sm focus:outline-none focus:border-stone-500 bg-stone-50 text-sm"
                    >
                        <option value="all">指定なし</option>
                        <option value="under-5000">¥5,000以下</option>
                        <option value="5000-10000">¥5,000 - ¥10,000</option>
                        <option value="10000-30000">¥10,000 - ¥30,000</option>
                        <option value="over-30000">¥30,000以上</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
