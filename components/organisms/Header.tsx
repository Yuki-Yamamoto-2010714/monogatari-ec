'use client'

import Link from 'next/link'
import { CartIcon } from '../molecules/CartIcon'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export const Header: React.FC = () => {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Header style based on route and scroll
  const isTransparent = isHome && !isScrolled

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isTransparent
          ? 'bg-transparent border-transparent text-white'
          : 'bg-white/95 backdrop-blur-sm border-b border-stone-200 text-stone-900 shadow-sm'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className={`text-2xl font-bold font-serif tracking-in-expand ${isTransparent ? 'text-white' : 'text-stone-900'
              }`}
          >
            ものがたりEC
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {[
              { label: '商品一覧', href: '/products' },
              { label: '物語', href: '/stories' },
              { label: '職人紹介', href: '/artisans' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wider hover:opacity-70 transition-colors ${isTransparent ? 'text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart Icon */}
          <div className={`flex items-center ${isTransparent ? 'text-white' : 'text-stone-900'}`}>
            <CartIcon />
          </div>
        </div>

        {/* Mobile Navigation (Simplified for now) */}
        <div className="md:hidden pb-4 flex space-x-4">
          {/* Mobile menu items would go here */}
        </div>
      </nav>
    </header>
  )
}

