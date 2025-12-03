import { PortableTextBlock } from '@portabletext/types'

export interface Artisan {
  _id: string
  name: string
  slug: {
    current: string
  }
  portrait?: any
  craftType: 'inami-woodcarving' | 'gokayama-washi' | 'silk-weaving' | 'other'
  philosophy?: string
  history?: PortableTextBlock[]
  videoInterview?: string
  workshop?: {
    name: string
    address: string
    established: number
  }
  products?: Product[]
  stories?: Story[]
}

export interface Product {
  _id: string
  title: string
  slug: {
    current: string
  }
  images?: any[]
  price: number
  description?: string
  narrativeDescription?: PortableTextBlock[]
  artisan: Artisan
  category?: 'sculpture' | 'washi-products' | 'textiles' | 'other'
  specifications?: {
    material?: string
    dimensions?: string
    weight?: string
    careGuide?: string
  }
  inStock: boolean
  featured: boolean
  relatedStories?: Story[]
}

export interface Story {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  mainImage: any
  artisan?: Artisan
  publishedAt: string
  body: any[]
  featured: boolean
}

export interface CartItem {
  productId: string
  title: string
  price: number
  quantity: number
  image?: string
  slug: string
}

export interface Cart {
  items: CartItem[]
  total: number
}
