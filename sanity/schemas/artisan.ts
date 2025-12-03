import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artisan',
  title: '職人プロフィール',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '氏名',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'portrait',
      title: 'ポートレート写真',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'craftType',
      title: '工芸ジャンル',
      type: 'string',
      options: {
        list: [
          { title: '井波彫刻', value: 'inami-woodcarving' },
          { title: '五箇山和紙', value: 'gokayama-washi' },
          { title: '絹織物', value: 'silk-weaving' },
          { title: 'その他', value: 'other' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'philosophy',
      title: '製作哲学・想い',
      type: 'text',
      rows: 4,
      description: '職人の核となるメッセージ。トップページや特集で使用。',
    }),
    defineField({
      name: 'history',
      title: '経歴・沿革',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'videoInterview',
      title: 'インタビュー動画URL',
      type: 'url',
      description: 'YouTubeまたはVimeoのリンク',
    }),
    defineField({
      name: 'workshop',
      title: '工房情報',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: '工房名',
          type: 'string',
        },
        {
          name: 'address',
          title: '住所',
          type: 'string',
        },
        {
          name: 'established',
          title: '創業年',
          type: 'number',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'craftType',
      media: 'portrait',
    },
  },
})
