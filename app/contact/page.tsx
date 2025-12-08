'use client'

export default function ContactPage() {
    return (
        <div className="bg-stone-50 min-h-screen pt-28 md:pt-32 pb-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold font-serif text-stone-900 mb-12 text-center">
                    お問い合わせ
                </h1>

                <div className="bg-white p-10 rounded-sm shadow-sm border border-stone-100">
                    <p className="text-stone-600 mb-8 leading-relaxed">
                        商品に関するご質問、職人へのメッセージ、取材のご依頼など、お気軽にお問い合わせください。<br />
                        通常、3営業日以内に担当者より返信いたします。
                    </p>

                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-stone-900 mb-2">
                                お名前 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full border border-stone-300 rounded-sm px-4 py-3 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors"
                                placeholder="山田 太郎"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-stone-900 mb-2">
                                メールアドレス <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full border border-stone-300 rounded-sm px-4 py-3 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors"
                                placeholder="taro@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-bold text-stone-900 mb-2">
                                お問い合わせ種別
                            </label>
                            <select
                                id="category"
                                className="w-full border border-stone-300 rounded-sm px-4 py-3 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors bg-white"
                            >
                                <option>商品について</option>
                                <option>ご注文について</option>
                                <option>配送・返品について</option>
                                <option>その他</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-bold text-stone-900 mb-2">
                                お問い合わせ内容 <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="message"
                                rows={6}
                                className="w-full border border-stone-300 rounded-sm px-4 py-3 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors"
                                placeholder="お問い合わせ内容をご記入ください"
                            ></textarea>
                        </div>

                        <button
                            type="button"
                            className="w-full bg-stone-900 text-white font-bold py-4 hover:bg-stone-800 transition-colors rounded-sm"
                            onClick={() => alert('デモサイトのため送信機能は実装されていません')}
                        >
                            送信する
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
