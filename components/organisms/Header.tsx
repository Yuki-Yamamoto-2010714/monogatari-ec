import Link from 'next/link'
import { CartIcon } from '../molecules/CartIcon'

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            ものがたりEC
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              商品一覧
            </Link>
            <Link
              href="/stories"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              物語
            </Link>
            <Link
              href="/artisans"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              職人紹介
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            <CartIcon />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4 flex space-x-4">
          <Link href="/products" className="text-sm text-gray-700 hover:text-gray-900">
            商品
          </Link>
          <Link href="/stories" className="text-sm text-gray-700 hover:text-gray-900">
            物語
          </Link>
          <Link href="/artisans" className="text-sm text-gray-700 hover:text-gray-900">
            職人
          </Link>
        </div>
      </nav>
    </header>
  )
}
