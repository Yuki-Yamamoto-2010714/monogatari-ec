import Link from 'next/link'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">ものがたりEC</h3>
            <p className="text-gray-400 text-sm">
              南砺市の伝統工芸品を、職人の物語とともにお届けします。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">ショップ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white text-sm transition-colors">
                  商品一覧
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="text-gray-400 hover:text-white text-sm transition-colors">
                  職人紹介
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-gray-400 hover:text-white text-sm transition-colors">
                  物語
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">サポート</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  私たちについて
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-white text-sm transition-colors">
                  配送・返品
                </Link>
              </li>
              <li>
                <Link href="/qr" className="text-gray-400 hover:text-white text-sm transition-colors">
                  スマホで見る
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">法的情報</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/tokushoho" className="text-gray-400 hover:text-white text-sm transition-colors">
                  特定商取引法
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 ものがたりEC. All rights reserved.</p>
          <p className="mt-2">南砺市「なんチャレ2025」起業チャレンジ部門</p>
        </div>
      </div>
    </footer>
  )
}
