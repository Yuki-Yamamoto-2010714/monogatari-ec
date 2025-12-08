'use client'

import { useActionState } from 'react'
import { sendInquiry } from '@/app/artisans/[slug]/actions'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface InquiryFormProps {
    artisanId: string
    artisanName: string
}

export default function InquiryForm({ artisanId, artisanName }: InquiryFormProps) {
    const [state, action, isPending] = useActionState(sendInquiry, {})
    const [isVisible, setIsVisible] = useState(false)

    if (!isVisible) {
        return (
            <div className="text-center mt-12 mb-20">
                <p className="text-stone-600 mb-6 font-serif">
                    {artisanName}さんに仕事の依頼や相談をしてみませんか？
                </p>
                <button
                    onClick={() => setIsVisible(true)}
                    className="bg-stone-800 text-white px-8 py-3 rounded-sm hover:bg-stone-700 transition-colors shadow-lg font-medium"
                >
                    お問い合わせフォームを表示
                </button>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="max-w-xl mx-auto mt-12 mb-20 p-8 bg-white border border-stone-200 shadow-xl rounded-sm"
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif font-bold text-stone-900">
                    {artisanName}さんへのお問い合わせ
                </h3>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-stone-400 hover:text-stone-600"
                >
                    閉じる
                </button>
            </div>

            {state.success ? (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 text-green-800 p-6 rounded-sm border border-green-200 text-center"
                >
                    <p className="font-bold mb-2">送信ありがとうございました</p>
                    <p className="text-sm">職人等の確認後、ご連絡させていただきます。</p>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="mt-4 text-green-700 underline text-sm"
                    >
                        閉じる
                    </button>
                </motion.div>
            ) : (
                <form action={action} className="space-y-5">
                    <input type="hidden" name="artisanId" value={artisanId} />

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                            お名前
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-2 border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-500 bg-stone-50 text-stone-900 placeholder:text-stone-400"
                            placeholder="お名前"
                        />
                        {state.fieldErrors?.name && (
                            <p className="text-red-500 text-sm mt-1">{state.fieldErrors.name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                            メールアドレス
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-500 bg-stone-50 text-stone-900 placeholder:text-stone-400"
                            placeholder="example@email.com"
                        />
                        {state.fieldErrors?.email && (
                            <p className="text-red-500 text-sm mt-1">{state.fieldErrors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                            メッセージ
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            required
                            className="w-full px-4 py-2 border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-500 bg-stone-50 text-stone-900 placeholder:text-stone-400"
                            placeholder="作品についての質問や、オーダーメイドの相談など..."
                        ></textarea>
                        {state.fieldErrors?.message && (
                            <p className="text-red-500 text-sm mt-1">{state.fieldErrors.message}</p>
                        )}
                    </div>

                    {state.error && (
                        <p className="text-red-500 text-sm">{state.error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-stone-900 text-white font-bold py-3 px-4 rounded-sm hover:bg-stone-700 transition-colors disabled:opacity-50"
                    >
                        {isPending ? '送信中...' : 'メッセージを送信'}
                    </button>
                </form>
            )}
        </motion.div>
    )
}
