'use client'

import { QRCodeSVG } from 'qrcode.react'
import { useState, useEffect } from 'react'

export default function QRPage() {
    const [url, setUrl] = useState('')

    useEffect(() => {
        // Use production URL to avoid Vercel Authentication on preview deployments
        const prodUrl = 'https://monogatari-ec.vercel.app'
        setUrl(prodUrl)
    }, [])

    return (
        <div className="min-h-screen bg-stone-50 pt-28 md:pt-32 pb-8 px-8 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-sm shadow-lg border border-stone-200 text-center max-w-sm w-full">
                <h1 className="text-xl font-bold font-serif text-stone-900 mb-6">
                    スマホで確認
                </h1>

                {url ? (
                    <div className="flex flex-col items-center gap-6">
                        <div className="bg-white p-4 border border-stone-100 rounded-sm">
                            <QRCodeSVG value={url} size={200} />
                        </div>

                        <div className="text-left w-full">
                            <p className="text-xs text-stone-500 mb-1">表示中のURL:</p>
                            <code className="block bg-stone-100 p-2 rounded text-xs break-all text-stone-700 font-mono">
                                {url}
                            </code>
                        </div>

                        <p className="text-xs text-stone-400">
                            ※ 同じWi-Fiネットワーク内のスマホ、<br />
                            またはデプロイ後のURLでスキャンしてください。
                        </p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}
