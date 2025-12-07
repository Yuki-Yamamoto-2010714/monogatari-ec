export default function TokushohoPage() {
    return (
        <div className="bg-stone-50 min-h-screen py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold font-serif text-stone-900 mb-10 text-center">
                    特定商取引法に基づく表記
                </h1>

                <div className="bg-white p-10 rounded-sm shadow-sm border border-stone-100">
                    <table className="w-full text-left border-collapse">
                        <tbody>
                            <tr className="border-b border-stone-200">
                                <th className="py-4 px-4 font-bold text-stone-900 bg-stone-50 w-1/3">販売業者</th>
                                <td className="py-4 px-4 text-stone-600">ものがたりEC プロジェクト</td>
                            </tr>
                            <tr className="border-b border-stone-200">
                                <th className="py-4 px-4 font-bold text-stone-900 bg-stone-50">運営統括責任者</th>
                                <td className="py-4 px-4 text-stone-600">山本 ゆうき</td>
                            </tr>
                            <tr className="border-b border-stone-200">
                                <th className="py-4 px-4 font-bold text-stone-900 bg-stone-50">所在地</th>
                                <td className="py-4 px-4 text-stone-600">
                                    〒939-1692<br />
                                    富山県南砺市荒木1550（南砺市役所内 なんチャレ事務局）
                                </td>
                            </tr>
                            <tr className="border-b border-stone-200">
                                <th className="py-4 px-4 font-bold text-stone-900 bg-stone-50">電話番号</th>
                                <td className="py-4 px-4 text-stone-600">0763-23-2000（代表）</td>
                            </tr>
                            <tr className="border-b border-stone-200">
                                <th className="py-4 px-4 font-bold text-stone-900 bg-stone-50">メールアドレス</th>
                                <td className="py-4 px-4 text-stone-600">info@monogatari-ec.demo</td>
                            </tr>
                            <tr className="border-b border-stone-200">
                                <th className="py-4 px-4 font-bold text-stone-900 bg-stone-50">商品代金以外の必要料金</th>
                                <td className="py-4 px-4 text-stone-600">
                                    <ul className="list-disc list-inside">
                                        <li>消費税（商品代金に含んで表示）</li>
                                        <li>送料（本州・四国・九州：880円、北海道・沖縄：1,430円）</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr className="border-b border-stone-200">
                                <th className="py-4 px-4 font-bold text-stone-900 bg-stone-50">引き渡し時期</th>
                                <td className="py-4 px-4 text-stone-600">
                                    ご注文確認後、3〜5営業日以内に発送いたします。<br />
                                    ※受注生産品は別途納期をご連絡いたします。
                                </td>
                            </tr>
                            <tr className="border-b border-stone-200">
                                <th className="py-4 px-4 font-bold text-stone-900 bg-stone-50">お支払い方法</th>
                                <td className="py-4 px-4 text-stone-600">
                                    クレジットカード決済（Visa, Mastercard, JCB, Amex）
                                </td>
                            </tr>
                            <tr>
                                <th className="py-4 px-4 font-bold text-stone-900 bg-stone-50">返品・交換について</th>
                                <td className="py-4 px-4 text-stone-600">
                                    商品到着後7日以内にご連絡いただいた場合のみ承ります。<br />
                                    破損・不良品の場合は着払いにて、お客様都合の場合は元払いにてご返送ください。
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
