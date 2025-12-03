export default async function ArtisanPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4">職人: {slug}</h1>
      <p className="text-gray-600">
        職人のプロフィール、哲学、作品がここに表示されます。
      </p>
    </div>
  )
}
