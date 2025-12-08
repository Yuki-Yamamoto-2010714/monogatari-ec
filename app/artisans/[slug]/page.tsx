import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getArtisanBySlug } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/client'
import { ProductCard } from '@/components/molecules/ProductCard'
import InquiryForm from '@/components/organisms/InquiryForm'

export default async function ArtisanPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const artisan = await getArtisanBySlug(slug)

  if (!artisan) {
    notFound()
  }

  // Placeholder logic
  const getPlaceholderImage = (art: any) => {
    if (art.name?.includes('花子') || art.name?.includes('Hanako')) {
      return '/images/placeholder_female_artisan.png'
    }
    return '/images/placeholder_artisan.png'
  }

  const portraitUrl = artisan.portrait ? urlFor(artisan.portrait).url() : getPlaceholderImage(artisan)

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Artisan Hero */}
      <section className="relative bg-white pt-20 pb-16 px-4 border-b border-stone-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* ... existing header ... */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
            <Image
              src={portraitUrl}
              alt={artisan.name}
              fill
              className="object-cover rounded-full border-4 border-stone-100 shadow-xl"
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <div className="inline-block px-3 py-1 bg-stone-100 text-stone-800 text-sm font-bold tracking-widest mb-4 rounded-full">
              CRAFTSMAN PROFILE
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-stone-900 mb-6">
              {artisan.name}
            </h1>
            <p className="text-xl text-stone-800 font-serif leading-relaxed italic mb-8 font-medium">
              "{artisan.philosophy}"
            </p>
            {artisan.history && (
              <div className="prose prose-stone text-stone-900 font-medium">
                <p>{artisan.history}</p>
              </div>
            )}

            {/* RICH CONTENT DEMO: Hanako Sato */}
            {(artisan.name?.includes('花子') || artisan.name?.includes('Hanako')) && (
              <div className="mt-8 pt-8 border-t border-stone-100">
                <h3 className="text-xl font-bold font-serif mb-4 mt-8 text-stone-900">受け継がれる「水」の記憶</h3>
                <p className="text-stone-800 leading-loose mb-6 font-medium">
                  私の和紙作りは、五箇山の雪解け水から始まります。冷たく澄んだ水が、楮（こうぞ）の繊維を強く、美しく絡ませます。
                  祖母はよく言っていました。「紙は水で決まる。水に感謝しなさい」と。
                  その言葉の本当の意味を理解したのは、私もまた、この厳しい冬の冷たさに手を浸すようになってからでした。
                </p>

                <h3 className="text-xl font-bold font-serif mb-4 mt-8 text-stone-900">指先に宿る感覚</h3>
                <p className="text-stone-800 leading-loose mb-6 font-medium">
                  漉き舟（すきふね）の中で繊維が舞う様子は、まるで生き物のようです。
                  簀桁（すけた）を揺らすリズム、水の重み、そのすべてを指先で感じ取ります。
                  100枚漉けば100枚違う。けれど、そのどれもが「佐藤花子の紙」であるように、魂を込めています。
                  機械で作られた均一な紙にはない、揺らぎと温もり。それが、手漉き和紙の真価だと思うのです。
                </p>

                <div className="bg-stone-50 p-6 rounded-sm mt-8 border border-stone-200">
                  <h4 className="text-lg font-bold font-serif mb-4 text-stone-900 border-b border-stone-300 pb-2 inline-block">Q&A: 職人に聞く</h4>
                  <div className="space-y-6">
                    <div>
                      <p className="font-bold text-stone-900 mb-2">Q. 最も大切にしている道具は？</p>
                      <p className="text-stone-800 font-medium">A. 簀桁（すけた）です。竹ひご一本一本を絹糸で編んだもので、これもまた職人の手仕事によるものです。私の手に馴染むまで数年かかりましたが、今では体の一部です。</p>
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 mb-2">Q. これからの挑戦は？</p>
                      <p className="text-stone-800 font-medium">A. 和紙を「書くもの」から「空間を彩るもの」へ。照明やインテリア素材としての可能性を追求し、現代の暮らしに和紙の柔らかい光を届けたいですね。</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* RICH CONTENT DEMO: Yamada */}
            {(artisan.name?.includes('山田') || artisan.name?.includes('Yamada')) && (
              <div className="mt-8 pt-8 border-t border-stone-100">
                <h3 className="text-xl font-bold font-serif mb-4 mt-8 text-stone-900">木の声を聞く、200本の鑿（のみ）</h3>
                <p className="text-stone-800 leading-loose mb-6 font-medium">
                  井波彫刻は、一彫り一彫りが真剣勝負です。失敗すれば木は元に戻らない。だからこそ、鑿を入れる前に、木と対話します。
                  木目、硬さ、香り。木が「どうなりたいか」を語りかけてくるのです。
                  私は200本以上の鑿を使い分けますが、その一本一本に役割があり、魂が宿っています。
                </p>

                <h3 className="text-xl font-bold font-serif mb-4 mt-8 text-stone-900">欄間（らんま）から、現代のアートへ</h3>
                <p className="text-stone-800 leading-loose mb-6 font-medium">
                  かつては寺院や日本家屋のための欄間が主でしたが、今は違います。
                  立体的な透かし彫りの技術を活かし、現代のリビングに合うオブジェや、壁掛けのアートとしても提案しています。
                  伝統を守るということは、形を変えずに残すことではなく、時代の空気に合わせて進化させることだと信じています。
                </p>

                <div className="bg-stone-50 p-6 rounded-sm mt-8 border border-stone-200">
                  <h4 className="text-lg font-bold font-serif mb-4 text-stone-900 border-b border-stone-300 pb-2 inline-block">Q&A: 職人に聞く</h4>
                  <div className="space-y-6">
                    <div>
                      <p className="font-bold text-stone-900 mb-2">Q. 修行時代で一番辛かったことは？</p>
                      <p className="text-stone-800 font-medium">A. 最初の3年間は、鑿を研ぐことしかさせてもらえませんでした。「道具を扱えない者に、木を彫る資格はない」。師匠のその言葉の意味が、今なら痛いほどわかります。</p>
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 mb-2">Q. 作品作りで譲れないことは？</p>
                      <p className="text-stone-800 font-medium">A. 「裏側」です。欄間は表だけでなく、裏から見ても美しくなければなりません。見えないところにこそ、職人の美学と誠実さが表れるのです。</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

        {/* Products Section */}
        {artisan.products && artisan.products.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-bold font-serif text-stone-900">
                手仕事の作品
              </h2>
              <div className="h-[1px] bg-stone-300 flex-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artisan.products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Stories Section */}
        {artisan.stories && artisan.stories.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-bold font-serif text-stone-900">
                関連する物語
              </h2>
              <div className="h-[1px] bg-stone-300 flex-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {artisan.stories.map((story: any) => (
                <Link
                  key={story._id}
                  href={`/stories/${story.slug.current}`}
                  className="group relative h-80 overflow-hidden rounded-sm shadow-lg block"
                >
                  <div className="absolute inset-0">
                    {story.mainImage && (
                      <Image
                        src={urlFor(story.mainImage).url()}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <p className="text-xs tracking-widest uppercase mb-2 opacity-80">Story</p>
                    <h3 className="text-2xl font-bold font-serif mb-2 leading-tight">
                      {story.title}
                    </h3>
                    {story.excerpt && (
                      <p className="text-white/80 line-clamp-2 text-sm">
                        {story.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Inquiry Section */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold font-serif text-stone-900">
              お問い合わせ
            </h2>
            <div className="h-[1px] bg-stone-300 flex-1"></div>
          </div>
          <InquiryForm artisanId={artisan._id} artisanName={artisan.name} />
        </section>
      </div>
    </div>
  )
}
