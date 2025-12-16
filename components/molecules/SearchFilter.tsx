'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

export function SearchFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [search, setSearch] = useState(searchParams.get('q') || '')
    const [category, setCategory] = useState(searchParams.get('category') || 'all')
    const [priceRange, setPriceRange] = useState(searchParams.get('price') || 'all')

    const executeSearch = () => {
        const params = new URLSearchParams()

        if (search) params.set('q', search)
        if (category && category !== 'all') params.set('category', category)
        if (priceRange && priceRange !== 'all') params.set('price', priceRange)

        router.push(`/products?${params.toString()}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            executeSearch()
        }
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value)
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriceRange(e.target.value)
    }

    return (
        <div className="bg-white p-6 rounded-sm shadow-sm border border-stone-200 mb-8">
            <h3 className="text-lg font-serif font-bold text-stone-800 mb-4">作品を探す</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search Input */}
                <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 uppercase tracking-wider">Keywords</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="商品名など..."
                            className="w-full px-3 py-2 border border-stone-300 rounded-sm focus:outline-none focus:border-stone-500 bg-stone-50 text-sm placeholder:text-stone-500 text-stone-900"
                        />
                        <button
                            onClick={executeSearch}
                            className="px-4 py-2 bg-stone-800 text-white text-sm font-bold rounded-sm hover:bg-stone-700 transition-colors"
                        >
                            検索
                        </button>
                    </div>
                </div>

                {/* Category Select */}
                <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 uppercase tracking-wider">Category</label>
                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        className="w-full px-3 py-2 border border-stone-300 rounded-sm focus:outline-none focus:border-stone-500 bg-stone-50 text-sm text-stone-800"
                    >
                        <option value="all">すべてのカテゴリ</option>
                        <option value="sculpture">彫刻</option>
                        <option value="washi-products">和紙製品</option>
                        <option value="textiles">織物</option>
                        <option value="other">その他</option>
                    </select>
                </div>

                {/* Price Select */}
                <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 uppercase tracking-wider">Price</label>
                    <select
                        value={priceRange}
                        onChange={handlePriceChange}
                        className="w-full px-3 py-2 border border-stone-300 rounded-sm focus:outline-none focus:border-stone-500 bg-stone-50 text-sm text-stone-800"
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
