'use client'

import { useActionState } from 'react'
import { postComment } from '@/app/actions/comment'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export interface Comment {
    _id: string
    name: string
    content: string
    createdAt: string
    approved: boolean
}

interface CommentSectionProps {
    targetId: string
    targetType: 'story' | 'product'
    comments: Comment[]
    title?: string
}

export default function CommentSection({ targetId, targetType, comments, title = 'コメント' }: CommentSectionProps) {
    const [state, action, isPending] = useActionState(postComment, {})
    const pathname = usePathname()

    return (
        <div className="mt-16 max-w-2xl mx-auto px-4">
            <h3 className="text-2xl font-serif mb-8 text-stone-800">{title}</h3>

            <div className="space-y-8 mb-12">
                {comments.length === 0 ? (
                    <p className="text-stone-500 italic">まだ{title}はありません。</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment._id} className="border-b border-stone-200 pb-6">
                            <div className="flex justify-between items-baseline mb-2">
                                <span className="font-medium text-stone-800">{comment.name}</span>
                                <span className="text-sm text-stone-500">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                                {comment.content}
                            </p>
                        </div>
                    ))
                )}
            </div>

            <div className="bg-stone-50 p-6 rounded-lg md:p-8">
                <h4 className="text-lg font-medium mb-4 text-stone-800">{title}を投稿する</h4>

                {state.success ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 text-green-800 p-4 rounded mb-4 border border-green-200"
                    >
                        投稿ありがとうございます。承認後に表示されます。
                    </motion.div>
                ) : (
                    <form action={action} className="space-y-4">
                        <input type="hidden" name="targetId" value={targetId} />
                        <input type="hidden" name="targetType" value={targetType} />
                        <input type="hidden" name="pathname" value={pathname} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                                    お名前
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-400 bg-white text-stone-900 placeholder:text-stone-400"
                                    placeholder="お名前を入力してください"
                                />
                                {state.fieldErrors?.name && (
                                    <p className="text-red-500 text-sm mt-1">{state.fieldErrors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                                    メールアドレス
                                    <span className="text-stone-400 text-xs ml-2">※公開されません</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-400 bg-white text-stone-900 placeholder:text-stone-400"
                                    placeholder="example@email.com"
                                />
                                {state.fieldErrors?.email && (
                                    <p className="text-red-500 text-sm mt-1">{state.fieldErrors.email}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-stone-700 mb-1">
                                本文
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                rows={4}
                                required
                                className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-400 bg-white text-stone-900 placeholder:text-stone-400"
                                placeholder="コメントやレビューを入力してください..."
                            ></textarea>
                            {state.fieldErrors?.content && (
                                <p className="text-red-500 text-sm mt-1">{state.fieldErrors.content}</p>
                            )}
                        </div>

                        {state.error && (
                            <p className="text-red-500 text-sm">{state.error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full md:w-auto px-6 py-2 bg-stone-800 text-white rounded hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isPending ? '送信中...' : '送信する'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
