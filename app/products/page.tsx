import { getAllProducts } from '@/lib/sanity/queries'
import { ProductCard } from '@/components/molecules/ProductCard'

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">商品一覧</h1>
        <p className="text-lg text-gray-600">
          南砺市の職人が丹精込めて作り上げた伝統工芸品をご覧ください
        </p>
      </div>

      {products.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">商品がまだ登録されていません</h2>
          <p className="text-gray-700">
            Sanityスタジオで商品を作成すると、ここに表示されます。
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
