import { createClient } from '@sanity/client'

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'oa68x7h8',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2025-11-25',
    useCdn: false,
})

async function checkDuplicates() {
    const query = `*[_id in ["576570e3-5ac5-463c-a6b0-f07b12fa799b", "artisan-yamada"]] {
    _id,
    name,
    "portrait_asset": portrait.asset._ref
  }`

    const docs = await client.fetch(query)
    console.log(JSON.stringify(docs, null, 2))
}

checkDuplicates()
