'use client'

import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import { ProductEmbed } from './ProductEmbed'
import { ScrollySection } from './ScrollySection'

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }

      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || '画像'}
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    productEmbed: ({ value }: any) => {
      return <ProductEmbed value={value} />
    },
    scrollySection: ({ value }: any) => {
      return <ScrollySection value={value} />
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-12 mb-6 text-gray-900">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg leading-relaxed mb-6 text-gray-700">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-amber-600 pl-6 my-8 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    underline: ({ children }: any) => (
      <span className="underline">{children}</span>
    ),
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-amber-700 hover:text-amber-900 underline"
        >
          {children}
        </a>
      )
    },
  },
}

export function PortableTextRenderer({ value }: { value: any }) {
  return <PortableText value={value} components={components} />
}
