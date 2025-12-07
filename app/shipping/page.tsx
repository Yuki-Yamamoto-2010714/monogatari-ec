export default function ShippingPage() {
    return (
        <div className="bg-stone-50 min-h-screen py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold font-serif text-stone-900 mb-12 text-center">
                    配送・返品について
                </h1>

                <div className="bg-white p-10 rounded-sm shadow-sm border border-stone-100 space-y-12">

                    {/* 配送について */}
                    <section>
                        <h2 className="flex items-center text-xl font-bold text-stone-900 mb-6 pb-2 border-b border-stone-200">
                            <span className="bg-stone-900 text-white w-8 h-8 flex items-center justify-center rounded-full mr-3 text-sm">1</span>
                            配送について
                        </h2>
                        <div className="prose prose-stone text-stone-600 max-w-none">
                            <h3 className="text-lg font-bold text-stone-800 mt-6 mb-3">配送業者</h3>
                            <p>ヤマト運輸にてお届けいたします。</p>

                            <h3 className="text-lg font-bold text-stone-800 mt-6 mb-3">送料</h3>
                            <ul className="list-disc list-inside space-y-1 bg-stone-50 p-4 rounded-sm">
                                <li>本州・四国・九州：880円（税込）</li>
                                <li>北海道・沖縄：1,430円（税込）</li>
                                <li><strong>15,000円以上のお買い上げで送料無料</strong></li>
                            </ul>

                            <h3 className="text-lg font-bold text-stone-800 mt-6 mb-3">お届け時期</h3>
                            <p>
                                通常、ご注文確認後3〜5営業日以内に発送いたします。<br />
                                ※受注生産品につきましては、商品ページに記載の納期をいただきます（1ヶ月〜3ヶ月程度かかる場合がございます）。
                            </p>
                        </div>
                    </section>

                    {/* 梱包について */}
                    <section>
                        <h2 className="flex items-center text-xl font-bold text-stone-900 mb-6 pb-2 border-b border-stone-200">
                            <span className="bg-stone-900 text-white w-8 h-8 flex items-center justify-center rounded-full mr-3 text-sm">2</span>
                            梱包・ギフトラッピング
                        </h2>
                        <div className="prose prose-stone text-stone-600 max-w-none">
                            <p>
                                商品は、職人の手による桐箱または専用の化粧箱にお入れしてお届けします。<br />
                                ギフトラッピングをご希望の場合は、カート内にて「ギフト設定」をお選びください（有料：330円）。
                            </p>
                        </div>
                    </section>

                    {/* 返品・交換について */}
                    <section>
                        <h2 className="flex items-center text-xl font-bold text-stone-900 mb-6 pb-2 border-b border-stone-200">
                            <span className="bg-stone-900 text-white w-8 h-8 flex items-center justify-center rounded-full mr-3 text-sm">3</span>
                            返品・交換について
                        </h2>
                        <div className="prose prose-stone text-stone-600 max-w-none">
                            <h3 className="text-lg font-bold text-stone-800 mt-6 mb-3">お客様都合による返品</h3>
                            <p>
                                商品到着後7日以内に限り、未使用・未開封の場合のみ返品を承ります。<br />
                                その際の返送料はお客様ご負担となりますのでご了承ください。<br />
                                なお、受注生産品およびオーダーメイド品につきましては、返品をお受けできません。
                            </p>

                            <h3 className="text-lg font-bold text-stone-800 mt-6 mb-3">不良品・破損の場合</h3>
                            <p>
                                万一、お届けした商品に破損や不備があった場合、またはご注文と異なる商品が届いた場合は、
                                商品到着後7日以内にご連絡ください。<br />
                                速やかに交換または返金の手続きをとらせていただきます（送料は当店が負担いたします）。
                            </p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    )
}
