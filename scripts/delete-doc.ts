import { createClient } from '@sanity/client'

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'oa68x7h8',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2025-11-25',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN // Note: We might need a token for delete, but let's try without first if public dataset allows (unlikely for write).
    // Wait, I don't have a token in env vars visible to me. I only saw public vars.
    // I cannot delete from the client unless I have a write token.
    // However, `sanity dataset delete` or `sanity documents delete` via CLI might work if the user is authenticated in the CLI.
})

// I will use CLI command instead of this script for deletion.
