import { client } from './client'

// 全商品を取得 (フィルタリング対応)
export async function getFilteredProducts(params: { category?: string, minPrice?: number, maxPrice?: number, search?: string } = {}) {
  const { category, minPrice, maxPrice, search } = params

  const filters = ['_type == "product"', '!(_id in path("drafts.**"))']

  if (category && category !== 'all') {
    filters.push(`category == "${category}"`)
  }

  if (minPrice) {
    filters.push(`price >= ${minPrice}`)
  }

  if (maxPrice) {
    filters.push(`price <= ${maxPrice}`)
  }

  if (search) {
    filters.push(`(title match "*${search}*" || description match "*${search}*")`)
  }

  const filterString = filters.join(' && ')
  const query = `*[${filterString}] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    description,
    images,
    inStock,
    featured,
    category,
    "artisan": artisan->{
      _id,
      name,
      slug,
      craftType
    }
  }`

  return client.fetch(query, {}, { cache: 'no-store' })
}

// レガシー互換（必要なら残す）
export async function getAllProducts() {
  return getFilteredProducts({})
}

// 特集商品を取得
export async function getFeaturedProducts() {
  const query = `*[_type == "product" && !(_id in path("drafts.**")) && featured == true] | order(_createdAt desc) [0...6] {
    _id,
    title,
    slug,
    price,
    description,
    images,
    "artisan": artisan->{
      _id,
      name,
      slug,
      craftType
    }
  }`
  return client.fetch(query, {}, { cache: 'no-store' })
}

// 商品詳細を取得
export async function getProductBySlug(slug: string) {
  const query = `*[_type == "product" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
    _id,
    title,
    slug,
    price,
    description,
    narrativeDescription,
    images,
    inStock,
    category,
    specifications,
    "artisan": artisan->{
      _id,
      name,
      slug,
      portrait,
      craftType,
      philosophy
    },
    "relatedStories": relatedStories[]->{
      _id,
      title,
      slug,
      excerpt,
      mainImage
    },
    "comments": *[_type == "comment" && product._ref == ^._id && approved == true] | order(createdAt desc) {
      _id,
      name,
      content,
      createdAt,
      approved
    }
  }`
  return client.fetch(query, { slug }, { cache: 'no-store' })
}

// 全職人を取得
export async function getAllArtisans() {
  const query = `*[_type == "artisan" && !(_id in path("drafts.**"))] | order(name asc) {
    _id,
    name,
    slug,
    portrait,
    craftType,
    philosophy
  }`
  return client.fetch(query, {}, { cache: 'no-store' })
}

// 職人詳細を取得
export async function getArtisanBySlug(slug: string) {
  const query = `*[_type == "artisan" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
    _id,
    name,
    slug,
    portrait,
    craftType,
    philosophy,
    history,
    videoInterview,
    workshop,
    "products": *[_type == "product" && references(^._id)] {
      _id,
      title,
      slug,
      price,
      images,
      inStock
    },
    "stories": *[_type == "story" && references(^._id)] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt
    }
  }`
  return client.fetch(query, { slug }, { cache: 'no-store' })
}

// 全ストーリーを取得
export async function getAllStories() {
  const query = `*[_type == "story" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    featured,
    "artisan": artisan->{
      _id,
      name,
      slug,
      craftType
    }
  }`
  return client.fetch(query, {}, { cache: 'no-store' })
}

// 特集ストーリーを取得
export async function getFeaturedStories() {
  const query = `*[_type == "story" && !(_id in path("drafts.**")) && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    "artisan": artisan->{
      _id,
      name,
      slug,
      craftType
    }
  }`
  return client.fetch(query, {}, { cache: 'no-store' })
}

// ストーリー詳細を取得
export async function getStoryBySlug(slug: string) {
  const query = `*[_type == "story" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body[] {
      ...,
      _type == "productEmbed" => {
        ...,
        "product": product->{
          _id,
          title,
          slug,
          price,
          images,
          description,
          inStock
        }
      },
      _type == "image" => {
        ...,
        asset->
      },
      _type == "scrollySection" => {
        ...,
        backgroundImage {
          ...,
          asset->
        }
      }
    },
    "artisan": artisan->{
      _id,
      name,
      slug,
      portrait,
      craftType,
      philosophy
    },
    "comments": *[_type == "comment" && story._ref == ^._id && approved == true] | order(createdAt desc) {
      _id,
      name,
      content,
      createdAt,
      approved
    }
  }`
  return client.fetch(query, { slug }, { cache: 'no-store' })
}
