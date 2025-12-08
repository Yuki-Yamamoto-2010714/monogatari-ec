'use server'

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { revalidatePath } from 'next/cache'

export type ActionState = {
    success?: boolean
    error?: string
    fieldErrors?: {
        name?: string
        email?: string
        content?: string
    }
}

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
})

export async function postComment(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const content = formData.get('content') as string
    const targetId = formData.get('targetId') as string
    const targetType = formData.get('targetType') as 'story' | 'product'
    const pathname = formData.get('pathname') as string

    const errors: ActionState['fieldErrors'] = {}
    if (!name) errors.name = 'お名前は必須です'
    if (!email) errors.email = 'メールアドレスは必須です'
    if (!content) errors.content = '内容は必須です'

    if (Object.keys(errors).length > 0) {
        return { error: '入力内容に誤りがあります', fieldErrors: errors }
    }

    if (!process.env.SANITY_API_WRITE_TOKEN) {
        console.error('SANITY_API_WRITE_TOKEN is not set')
        return { error: 'サーバー設定エラー: 送信できませんでした' }
    }

    try {
        const doc: any = {
            _type: 'comment',
            name,
            email,
            content,
            approved: false,
            createdAt: new Date().toISOString(),
        }

        if (targetType === 'story') {
            doc.story = { _type: 'reference', _ref: targetId }
        } else if (targetType === 'product') {
            doc.product = { _type: 'reference', _ref: targetId }
        } else {
            return { error: '不正なターゲットタイプです' }
        }

        await client.create(doc)

        if (pathname) {
            revalidatePath(pathname)
        }

        return { success: true }
    } catch (error) {
        console.error('Comment submission error:', error)
        return { error: '送信中にエラーが発生しました' }
    }
}
