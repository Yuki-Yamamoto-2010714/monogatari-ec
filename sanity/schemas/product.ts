import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: '商品',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '商品名',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: '商品画像',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'price',
      title: '価格',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: '短い説明',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'narrativeDescription',
      title: '物語的商品説明',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'スペックではなく、背景や利用シーンを語るための説明文',
    }),
    defineField({
      name: 'artisan',
      title: '製作職人',
      type: 'reference',
      to: [{ type: 'artisan' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'カテゴリー',
      type: 'string',
      options: {
        list: [
          { title: '彫刻', value: 'sculpture' },
          { title: '和紙製品', value: 'washi-products' },
          { title: '織物', value: 'textiles' },
          { title: 'その他', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'specifications',
      title: '仕様・スペック',
      type: 'object',
      fields: [
        {
          name: 'material',
          title: '素材',
          type: 'string',
        },
        {
          name: 'dimensions',
          title: '寸法',
          type: 'string',
          description: '例: W300 × D200 × H150mm',
        },
        {
          name: 'weight',
          title: '重量',
          type: 'string',
        },
        {
          name: 'careGuide',
          title: '手入れ方法',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'inStock',
      title: '在庫あり',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: '特集商品',
      type: 'boolean',
      description: 'トップページに表示する',
      initialValue: false,
    }),
    defineField({
      name: 'relatedStories',
      title: '関連ストーリー',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'story' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'images.0',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `¥${subtitle.toLocaleString()}` : '価格未設定',
        media,
      }
    },
  },
})
