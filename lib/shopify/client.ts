const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

export async function shopifyFetch<T>({
    query,
    variables,
}: {
    query: string
    variables?: Record<string, any>
}): Promise<{ status: number; body: T } | never> {
    if (!domain || !accessToken) {
        throw new Error('Missing Shopify Environment Variables')
    }

    try {
        const result = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': accessToken,
            },
            body: JSON.stringify({ query, variables }),
        })

        const body = await result.json()

        if (body.errors) {
            throw body.errors[0]
        }

        return {
            status: result.status,
            body,
        }
    } catch (error) {
        console.error('Error:', error)
        throw {
            error,
            query,
        }
    }
}

// Queries
export const createCartMutation = `
  mutation createCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
            }
          }
        }
      }
    }
  }
`

export const addToCartMutation = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
