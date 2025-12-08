import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'inquiry',
    title: '職人への問い合わせ',
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
            validation: Rule => Rule.required().email(),
        }),
        defineField({
            name: 'message',
            title: 'メッセージ',
            type: 'text',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'artisan',
            title: '対象職人',
            type: 'reference',
            to: [{ type: 'artisan' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'status',
            title: 'ステータス',
            type: 'string',
            options: {
                list: [
                    { title: '新規', value: 'new' },
                    { title: '確認済み', value: 'read' },
                    { title: '返信済み', value: 'replied' },
                ],
            },
            initialValue: 'new',
        }),
        defineField({
            name: 'createdAt',
            title: '送信日時',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'message',
            subtitle: 'artisan.name',
            status: 'status',
        },
        prepare({ title, subtitle, status }) {
            const statusMap: Record<string, string> = {
                new: '新規',
                read: '確認済み',
                replied: '返信済み',
            }
            return {
                title: title,
                subtitle: `To: ${subtitle} (${statusMap[status] || status})`,
            }
        },
    },
})
