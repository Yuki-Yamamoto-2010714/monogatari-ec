import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'story',
  title: 'ストーリー記事',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'タイトル',
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
      name: 'excerpt',
      title: '要約',
      type: 'text',
      rows: 3,
      description: '一覧ページで表示される短い説明',
    }),
    defineField({
      name: 'mainImage',
      title: 'メインビジュアル',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'artisan',
      title: '関連職人',
      type: 'reference',
      to: [{ type: 'artisan' }],
    }),
    defineField({
      name: 'publishedAt',
      title: '公開日',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: '本文',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: '標準', value: 'normal' },
            { title: '見出し1', value: 'h1' },
            { title: '見出し2', value: 'h2' },
            { title: '見出し3', value: 'h3' },
            { title: '引用', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: '太字', value: 'strong' },
              { title: '斜体', value: 'em' },
              { title: 'アンダーライン', value: 'underline' },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'キャプション',
            },
            {
              name: 'alt',
              type: 'string',
              title: '代替テキスト',
            },
          ],
        },
        // 商品カード埋め込み
        {
          type: 'object',
          name: 'productEmbed',
          title: '商品カード埋め込み',
          fields: [
            {
              name: 'product',
              title: '紹介する商品',
              type: 'reference',
              to: [{ type: 'product' }],
              validation: Rule => Rule.required(),
            },
            {
              name: 'layout',
              title: '表示レイアウト',
              type: 'string',
              options: {
                list: [
                  { title: '標準カード', value: 'standard' },
                  { title: '大型フィーチャー', value: 'hero' },
                  { title: 'テキスト回り込み', value: 'float' },
                ],
              },
              initialValue: 'standard',
            },
            {
              name: 'caption',
              title: 'キャプション',
              type: 'string',
              description: '商品カードの下に表示される説明文',
            },
          ],
          preview: {
            select: {
              title: 'product.title',
              subtitle: 'layout',
              media: 'product.images.0',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: `商品: ${title || '未選択'}`,
                subtitle: `レイアウト: ${subtitle}`,
                media,
              }
            },
          },
        },
        // スクローリーテリング用セクション
        {
          type: 'object',
          name: 'scrollySection',
          title: 'スクローリーテリングセクション',
          fields: [
            {
              name: 'backgroundImage',
              title: '背景画像',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'content',
              title: 'コンテンツ',
              type: 'array',
              of: [{ type: 'block' }],
            },
            {
              name: 'animationType',
              title: 'アニメーションタイプ',
              type: 'string',
              options: {
                list: [
                  { title: 'パララックス（拡大）', value: 'parallax-zoom' },
                  { title: 'フェードイン', value: 'fade' },
                  { title: 'スライドイン', value: 'slide' },
                ],
              },
              initialValue: 'parallax-zoom',
            },
          ],
          preview: {
            select: {
              media: 'backgroundImage',
              animationType: 'animationType',
            },
            prepare({ media, animationType }) {
              return {
                title: 'スクローリーセクション',
                subtitle: animationType,
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: '特集記事',
      type: 'boolean',
      description: 'トップページに表示する',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'artisan.name',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `職人: ${subtitle}` : '職人未設定',
        media,
      }
    },
  },
})
