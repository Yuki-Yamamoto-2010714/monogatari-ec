
import { createClient } from '@sanity/client'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'oa68x7h8',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2025-11-25',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
})

async function main() {
    if (!process.env.SANITY_API_WRITE_TOKEN) {
        console.error('Error: SANITY_API_WRITE_TOKEN is missing in .env.local')
        process.exit(1)
    }

    console.log('Adding content...')

    // 1. Artisan: Tanaka Kinuko (Textiles)
    const artisan = {
        _type: 'artisan',
        name: '田中 絹子',
        slug: { _type: 'slug', current: 'tanaka-kinuko' },
        craftType: 'textiles', // existing schema
        philosophy: '城端絹の伝統を、現代の日常に。ふわりと風を纏うような着心地をお届けします。',
        workshop: {
            name: '田中絹織',
            address: '富山県南砺市城端',
            established: 1905
        }
        // portrait is optional, skipping for now as we don't have an asset ID
    }

    const createdArtisan = await client.createOrReplace({
        _id: 'artisan-tanaka',
        ...artisan
    })
    console.log('Created Artisan:', createdArtisan.name)

    // 2. Product 1: Silk Stole
    const product1 = {
        _type: 'product',
        title: '城端絹「手織りストール」',
        slug: { _type: 'slug', current: 'johana-silk-stole' },
        price: 12000,
        description: '極細の生糸で織り上げた、羽衣のような軽やかさを持つストール。',
        artisan: { _type: 'reference', _ref: createdArtisan._id },
        category: 'textiles',
        inStock: true,
        featured: true
        // images: skipping asset upload for simplicity, will fallback to placeholder
    }

    const createdProduct1 = await client.createOrReplace({
        _id: 'product-silk-stole',
        ...product1
    })
    console.log('Created Product:', createdProduct1.title)

    // 3. Product 2: Silk Coaster
    const product2 = {
        _type: 'product',
        title: '城端絹「彩りコースターセット」',
        slug: { _type: 'slug', current: 'johana-silk-coaster' },
        price: 2500,
        description: '着物の端切れを活かした、華やかなコースター5枚セット。',
        artisan: { _type: 'reference', _ref: createdArtisan._id },
        category: 'textiles',
        inStock: true,
        featured: false
    }

    const createdProduct2 = await client.createOrReplace({
        _id: 'product-silk-coaster',
        ...product2
    })
    console.log('Created Product:', createdProduct2.title)

    console.log('Done!')
}

main().catch(console.error)
