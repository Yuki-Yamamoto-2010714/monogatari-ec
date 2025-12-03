export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4">商品詳細: {slug}</h1>
      <p className="text-gray-600">
        Sanityスタジオでコンテンツを作成すると、ここに商品の詳細が表示されます。
      </p>
    </div>
  )
}
