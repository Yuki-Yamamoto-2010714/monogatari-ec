'use server'

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export type ActionState = {
    success?: boolean
    error?: string
    fieldErrors?: {
        name?: string
        email?: string
        message?: string
    }
}

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
})

export async function sendInquiry(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string
    const artisanId = formData.get('artisanId') as string

    const errors: ActionState['fieldErrors'] = {}
    if (!name) errors.name = 'お名前は必須です'
    if (!email) errors.email = 'メールアドレスは必須です'
    if (!message) errors.message = 'メッセージは必須です'

    if (Object.keys(errors).length > 0) {
        return { error: '入力内容に誤りがあります', fieldErrors: errors }
    }

    if (!process.env.SANITY_API_WRITE_TOKEN) {
        console.error('SANITY_API_WRITE_TOKEN is not set')
        return { error: 'サーバー設定エラー: 送信できませんでした' }
    }

    try {
        await client.create({
            _type: 'inquiry',
            name,
            email,
            message,
            artisan: {
                _type: 'reference',
                _ref: artisanId,
            },
            status: 'new',
            createdAt: new Date().toISOString(),
        })

        return { success: true }
    } catch (error) {
        console.error('Inquiry submission error:', error)
        return { error: '送信中にエラーが発生しました' }
    }
}
