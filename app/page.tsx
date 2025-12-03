import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export default async function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            職人の想いを、<br />あなたのもとへ
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            南砺市の伝統工芸品を、物語とともにお届けするECサイト
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto">
                商品を見る
              </Button>
            </Link>
            <Link href="/stories">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white">
                物語を読む
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">ものがたりECとは</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              南砺市が誇る井波彫刻や五箇山和紙といった伝統工芸品を、
              単なる商品カタログとして羅列するのではなく、職人の哲学、歴史的背景、
              そして製作過程という「物語」を通じて顧客に届けます。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🏔️</div>
              <h3 className="text-xl font-bold mb-2">南砺の伝統</h3>
              <p className="text-gray-600">
                井波彫刻、五箇山和紙、絹織物など、数百年の歴史を持つ伝統工芸品
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">👨‍🎨</div>
              <h3 className="text-xl font-bold mb-2">職人の想い</h3>
              <p className="text-gray-600">
                一人ひとりの職人の哲学、技術、そして作品への情熱を物語として紹介
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">特別な体験</h3>
              <p className="text-gray-600">
                スクロールと共に変化する物語体験で、商品の背景を深く理解
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">特集商品</h2>
            <p className="text-lg text-gray-600">
              職人の技が光る、厳選された作品をご紹介
            </p>
          </div>

          <div className="text-center">
            <p className="text-gray-500 mb-8">
              商品データを表示するには、Sanityスタジオでコンテンツを作成してください。
            </p>
            <Link href="/products">
              <Button>商品一覧へ</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">職人の物語</h2>
            <p className="text-lg text-gray-600">
              伝統を受け継ぐ職人たちの想いと、作品に込められた背景
            </p>
          </div>

          <div className="text-center">
            <p className="text-gray-500 mb-8">
              物語コンテンツを表示するには、Sanityスタジオでストーリーを作成してください。
            </p>
            <Link href="/stories">
              <Button>物語一覧へ</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            南砺の職人と、<br />あなたの暮らしをつなぐ
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            一つひとつ手作りされた工芸品を、職人の物語とともにお届けします
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              商品を探す
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
