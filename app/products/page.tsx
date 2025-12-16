import { getFilteredProducts } from '@/lib/sanity/queries'
import { ProductCard } from '@/components/molecules/ProductCard'
import { SearchFilter } from '@/components/molecules/SearchFilter'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined
  const search = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : undefined
  const priceRange = typeof resolvedSearchParams.price === 'string' ? resolvedSearchParams.price : undefined

  let minPrice: number | undefined
  let maxPrice: number | undefined

  if (priceRange) {
    if (priceRange === 'under-5000') {
      maxPrice = 5000
    } else if (priceRange === '5000-10000') {
      minPrice = 5000
      maxPrice = 10000
    } else if (priceRange === '10000-30000') {
      minPrice = 10000
      maxPrice = 30000
    } else if (priceRange === 'over-30000') {
      minPrice = 30000
    }
  }

  const products = await getFilteredProducts({ category, minPrice, maxPrice, search })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-serif mb-4 text-stone-900 dark:text-stone-100">商品一覧</h1>
        <p className="text-lg text-stone-700 dark:text-stone-200">
          南砺市の職人が丹精込めて作り上げた伝統工芸品をご覧ください
        </p>
      </div>

      <SearchFilter />

      {products.length === 0 ? (
        <div className="bg-stone-50 border border-stone-200 rounded-sm p-12 text-center my-12">
          <h2 className="text-xl font-bold font-serif mb-4 text-stone-800">条件に一致する作品が見つかりませんでした</h2>
          <p className="text-stone-600">
            検索条件を変更して、再度お試しください。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
