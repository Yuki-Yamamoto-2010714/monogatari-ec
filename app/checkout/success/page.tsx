import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-sm shadow-lg text-center border border-stone-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold font-serif text-stone-900 mb-4">
                    ご注文ありがとうございます
                </h1>

                <p className="text-stone-600 mb-8 leading-relaxed">
                    （デモサイトのため、実際の注文は行われませんでした）<br />
                    職人の物語に触れていただき、<br />
                    心より感謝申し上げます。
                </p>

                <Link href="/">
                    <Button className="w-full bg-stone-900 hover:bg-stone-800 text-white">
                        トップページへ戻る
                    </Button>
                </Link>
            </div>
        </div>
    )
}
