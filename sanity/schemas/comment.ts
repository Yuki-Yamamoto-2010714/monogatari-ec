import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'comment',
    title: 'コメント',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'お名前',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'email',
            title: 'メールアドレス',
            type: 'string',
            description: '公開されません',
            validation: Rule => Rule.required().email(),
        }),
        defineField({
            name: 'content',
            title: 'コメント内容',
            type: 'text',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'story',
            title: '対象記事',
            type: 'reference',
            to: [{ type: 'story' }],
            description: 'ストーリーへのコメントの場合に選択',
        }),
        defineField({
            name: 'product',
            title: '対象商品',
            type: 'reference',
            to: [{ type: 'product' }],
            description: '商品へのレビューの場合に選択',
        }),
        defineField({
            name: 'approved',
            title: '承認済み',
            type: 'boolean',
            initialValue: false,
            description: '承認されるまでサイトには表示されません',
        }),
        defineField({
            name: 'createdAt',
            title: '投稿日時',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'content',
            subtitle: 'name',
            approved: 'approved',
            storyTitle: 'story.title',
            productTitle: 'product.title',
        },
        prepare({ title, subtitle, approved, storyTitle, productTitle }) {
            const target = storyTitle ? `Story: ${storyTitle}` : productTitle ? `Product: ${productTitle}` : 'Unknown Target'
            return {
                title: title,
                subtitle: `${subtitle} (${approved ? '承認済' : '未承認'}) - ${target}`,
            }
        },
    },
    validation: Rule => Rule.custom((fields) => {
        if (!fields?.story && !fields?.product) {
            return '対象記事または対象商品のいずれかを選択してください'
        }
        if (fields?.story && fields?.product) {
            return '対象記事と対象商品を同時に選択することはできません'
        }
        return true
    }),
})
