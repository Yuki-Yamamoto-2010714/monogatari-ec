export default function AboutPage() {
    return (
        <div className="bg-stone-50 min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold font-serif text-stone-900 mb-12 text-center">
                    ものがたりECについて
                </h1>

                <div className="bg-white p-10 rounded-sm shadow-sm border border-stone-100 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold font-serif text-stone-800 mb-6 border-b border-stone-200 pb-2">
                            伝統と革新の架け橋に
                        </h2>
                        <div className="prose prose-stone text-stone-600 leading-relaxed">
                            <p className="mb-4">
                                富山県南砺市。ここには数百年の歴史を持つ「井波彫刻」や「五箇山和紙」といった、世界に誇る伝統工芸が息づいています。
                            </p>
                            <p className="mb-4">
                                しかし、素晴らしい技術と作品がありながら、その魅力が十分に伝わりきっていない現状もあります。
                                私たちは、単に「モノ」を売るのではなく、その背景にある「職人の物語」や「土地の空気感」も一緒に届けたいと考えています。
                            </p>
                            <p>
                                「ものがたりEC」は、南砺市の伝統工芸を次の世代、そして世界へと繋ぐための新しいプラットフォームです。
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold font-serif text-stone-800 mb-6 border-b border-stone-200 pb-2">
                            運営体制
                        </h2>
                        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                            <div className="col-span-1 font-bold text-stone-900">プロジェクト名</div>
                            <div className="col-span-2 text-stone-600">ものがたりEC プロジェクト</div>

                            <div className="col-span-1 font-bold text-stone-900">所在地</div>
                            <div className="col-span-2 text-stone-600">富山県南砺市（なんチャレ2025事務局内）</div>

                            <div className="col-span-1 font-bold text-stone-900">設立</div>
                            <div className="col-span-2 text-stone-600">2025年1月</div>

                            <div className="col-span-1 font-bold text-stone-900">事業内容</div>
                            <div className="col-span-2 text-stone-600">伝統工芸品のオンライン販売、職人の情報発信</div>
                        </dl>
                    </section>
                </div>
            </div>
        </div>
    )
}
