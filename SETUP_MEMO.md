# ものがたりEC - 開発メモ

**作成日**: 2025年11月17日
**プロジェクト**: 南砺市「なんチャレ2025」起業チャレンジ部門

---

## ✅ 完成した内容

### 実装済みの機能

#### 1. 基本構成
- ✅ Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- ✅ Sanity.io CMS統合（スキーマ定義完了）
- ✅ Zustand状態管理（カート機能）
- ✅ Framer Motion（アニメーション用パッケージ導入済み）
- ✅ 完全なビルド成功確認済み

#### 2. Sanityコンテンツスキーマ
以下の3つのコンテンツタイプを定義：

**Artisan（職人）**
- 氏名、スラッグ、ポートレート写真
- 工芸ジャンル（井波彫刻、五箇山和紙、絹織物、その他）
- 製作哲学・想い
- 経歴・沿革（リッチテキスト）
- インタビュー動画URL
- 工房情報（名前、住所、創業年）

**Product（商品）**
- 商品名、スラッグ、画像（複数）
- 価格、短い説明
- 物語的商品説明（リッチテキスト）
- 製作職人への参照
- カテゴリー、仕様・スペック
- 在庫状況、特集商品フラグ
- 関連ストーリーへの参照

**Story（ストーリー記事）**
- タイトル、スラッグ、要約
- メインビジュアル
- 関連職人への参照
- 公開日
- 本文（Portable Text）
  - 通常のテキスト、見出し、画像
  - **商品カード埋め込み機能**（3種類のレイアウト）
  - **スクローリーテリングセクション**（アニメーション設定可能）
- 特集記事フラグ

#### 3. 実装済みページ

| ページ | パス | 説明 |
|--------|------|------|
| トップページ | `/` | ヒーロー、説明、CTA完備 |
| 商品一覧 | `/products` | 実装済み（コンテンツ待ち） |
| 商品詳細 | `/products/[slug]` | 動的ルート実装済み |
| 職人一覧 | `/artisans` | 実装済み（コンテンツ待ち） |
| 職人詳細 | `/artisans/[slug]` | 動的ルート実装済み |
| ストーリー一覧 | `/stories` | 実装済み（コンテンツ待ち） |
| ストーリー詳細 | `/stories/[slug]` | 動的ルート実装済み |
| カート | `/cart` | 完全動作（追加/削除/数量変更） |

#### 4. コンポーネント

**Atoms（基本コンポーネント）**
- Button（3つのバリアント: primary, secondary, outline）

**Molecules（複合コンポーネント）**
- ProductCard（商品カード）
- CartIcon（カートアイコン + 動的カウント表示）

**Organisms（大規模コンポーネント）**
- Header（ナビゲーション、カートアイコン）
- Footer（リンク集、法的情報）

#### 5. 状態管理・データ連携

**Zustandカートストア** (`stores/cart-store.ts`)
- 商品の追加/削除
- 数量変更
- 合計金額計算
- LocalStorageへの自動保存

**Sanity統合** (`lib/sanity/`)
- クライアント設定
- 画像URL生成ヘルパー
- GROQ クエリ関数（全商品、職人、ストーリー取得など）

**Server Actions** (`actions/cart.ts`)
- カート操作用のサーバーアクション

#### 6. 設定ファイル
- ✅ `next.config.ts` - Sanity画像ドメイン許可設定
- ✅ `.env.local` - 環境変数（現在demoモード）
- ✅ `sanity.config.ts` - Sanityスタジオ設定

---

## 🚧 現在の状態

### 開発サーバー稼働中
```
Next.js: http://localhost:3001
```

### 未完了項目
- ⚠️ フロントエンドでのデータ表示確認（Sanityには正常にインポート済み）
- ❌ GitHubリポジトリへのプッシュ
- ❌ Vercelへのデプロイ
- ❌ 本番環境CORS設定
- ❌ QRコード生成

### 最新実装（2025年11月25日）
- ✅ @portabletext/reactパッケージのインストール
- ✅ Portable Textレンダリングコンポーネント実装
  - カスタム画像ブロック対応
  - 商品埋め込みブロック対応
  - スクローリーテリングセクション対応
  - リッチテキスト装飾（見出し、太字、引用など）
- ✅ 商品埋め込みコンポーネント (ProductEmbed)
  - 3種類のレイアウト（標準、大型フィーチャー、テキスト回り込み）
  - カートへの追加機能統合
- ✅ Framer Motionスクローリーテリングコンポーネント (ScrollySection)
  - パララックス（拡大）アニメーション
  - フェードインアニメーション
  - スライドインアニメーション
- ✅ ストーリー詳細ページの完全実装
  - ヒーローセクション
  - 職人情報カード
  - Portable Textコンテンツ統合
  - ストーリー末尾CTA
- ✅ ビルド成功確認（TypeScriptエラー解決）
- ✅ 開発サーバー起動確認
- ✅ Sanityプロジェクト初期化完了（プロジェクトID: oa68x7h8）
- ✅ Sanityスキーマ統合（structure.ts修正）
- ✅ サンプルデータ自動インポート（職人2人、商品3点、ストーリー2本）
- ✅ Sanity API設定修正（useCdn: false, perspective: published）

---

## 📝 次にやるべきこと（次回再開時）

### 🔴 優先度1: データ表示の確認・トラブルシューティング

#### 現在の状況
- Sanityにデータは正常にインポート済み（7件）
- APIクライアント設定を修正済み
- しかし、フロントエンドでデータが表示されない可能性あり

#### 確認手順
1. **Sanityスタジオでデータ確認**
   ```
   http://localhost:3001/studio
   ```
   - 左メニュー「職人プロフィール」をクリック → 2件表示されるか？
   - 左メニュー「商品」をクリック → 3件表示されるか？
   - 左メニュー「ストーリー記事」をクリック → 2件表示されるか？

2. **フロントエンドでデータ確認**
   ```
   http://localhost:3001/artisans
   http://localhost:3001/products
   http://localhost:3001/stories
   ```
   - 職人・商品・ストーリーが表示されるか？

3. **もしデータが表示されない場合**
   - ブラウザのコンソールでエラーを確認
   - 開発サーバーを再起動: `npm run dev`
   - キャッシュをクリア: ブラウザのハードリフレッシュ（Cmd + Shift + R）

### 🟡 優先度2: GitHubとVercelデプロイ

#### ステップ1: GitHubリポジトリ作成
1. https://github.com/new にアクセス
2. Repository name: `monogatari-ec`
3. Public または Private を選択
4. 「Create repository」をクリック

#### ステップ2: コードをGitHubにプッシュ
```bash
cd /Users/yamamotoyuuki/Desktop/なんちゃれ/monogatari-ec
git add .
git commit -m "feat: Complete Monogatari EC with Portable Text & Scrollytelling"
git remote add origin https://github.com/<ユーザー名>/monogatari-ec.git
git branch -M main
git push -u origin main
```

#### ステップ3: Vercelでデプロイ
1. https://vercel.com にアクセス
2. GitHubアカウントでログイン
3. 「Add New Project」をクリック
4. 「monogatari-ec」リポジトリを選択
5. 環境変数を設定：
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=oa68x7h8
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
6. 「Deploy」をクリック
7. デプロイ完了後、URLをコピー（例: `https://monogatari-ec.vercel.app`）

#### ステップ4: Sanity CORS設定（本番URL追加）
1. https://www.sanity.io/manage にアクセス
2. 「なんちゃれ」プロジェクトを選択
3. 左メニュー「API」→「CORS Origins」
4. 「Add CORS origin」をクリック
5. VercelのURL（例: `https://monogatari-ec.vercel.app`）を追加
6. 「Allow credentials」にチェック
7. 保存

#### ステップ5: QRコード生成
1. オンラインツールを使用: https://www.qr-code-generator.com/
2. VercelのURLを入力
3. QRコードをダウンロード
4. スマホでスキャンして動作確認

### 🟢 優先度3: コンテンツの充実（オプション）

Sanityスタジオで追加コンテンツを作成：
- 職人の写真を追加（ポートレート、工房の様子）
- 商品の画像を追加
- ストーリー記事に商品埋め込みとスクローリーテリングセクションを追加

---

## 🗂️ ファイル構造

```
monogatari-ec/
├── app/                         # Next.js App Router
│   ├── layout.tsx              # グローバルレイアウト
│   ├── page.tsx                # トップページ
│   ├── products/               # 商品関連
│   │   ├── page.tsx           # 一覧
│   │   └── [slug]/page.tsx    # 詳細
│   ├── artisans/               # 職人関連
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── stories/                # ストーリー関連
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── cart/                   # カート
│       └── page.tsx
│
├── components/
│   ├── atoms/
│   │   └── Button.tsx
│   ├── molecules/
│   │   ├── ProductCard.tsx
│   │   └── CartIcon.tsx
│   ├── organisms/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── story/                    # ストーリー専用コンポーネント
│       ├── PortableTextRenderer.tsx  # Portable Textレンダリング
│       ├── ProductEmbed.tsx          # 商品埋め込みブロック
│       └── ScrollySection.tsx        # スクローリーテリング
│
├── lib/
│   └── sanity/
│       ├── client.ts           # Sanityクライアント
│       └── queries.ts          # GROQクエリ集
│
├── sanity/
│   └── schemas/
│       ├── artisan.ts          # 職人スキーマ
│       ├── product.ts          # 商品スキーマ
│       ├── story.ts            # ストーリースキーマ
│       └── index.ts            # スキーマインデックス
│
├── stores/
│   └── cart-store.ts           # Zustandカートストア
│
├── types/
│   └── index.ts                # TypeScript型定義
│
├── actions/
│   └── cart.ts                 # Server Actions
│
├── sanity.config.ts            # Sanity設定
├── next.config.ts              # Next.js設定
├── .env.local                  # 環境変数
└── README.md                   # ドキュメント
```

---

## 💻 コマンド一覧

### 開発
```bash
# Next.js開発サーバー
npm run dev

# Sanityスタジオ
npx sanity dev

# ビルド
npm run build

# 本番起動
npm run start
```

### Sanity管理
```bash
# プロジェクト初期化
npx sanity init

# データセットのエクスポート
npx sanity dataset export production backup.tar.gz

# データセットのインポート
npx sanity dataset import backup.tar.gz production
```

---

## 🔍 確認済み動作

### ビルド
```
✓ Compiled successfully
✓ Generating static pages (8/8)
✓ Finalizing page optimization

Route (app)
├ ○ /                    (トップ)
├ ○ /artisans           (職人一覧)
├ ƒ /artisans/[slug]    (職人詳細)
├ ○ /cart               (カート)
├ ○ /products           (商品一覧)
├ ƒ /products/[slug]    (商品詳細)
├ ○ /stories            (ストーリー一覧)
└ ƒ /stories/[slug]     (ストーリー詳細)
```

### カート機能
- ✅ 商品追加（Zustand + LocalStorage）
- ✅ 数量変更（+/-ボタン）
- ✅ 商品削除
- ✅ 合計金額計算
- ✅ ページリロード後もデータ保持

---

## 📚 技術仕様書との対応

仕様書「詳細設計・技術仕様書作成.md」の内容を以下の通り実装：

| 仕様項目 | 実装状況 |
|---------|---------|
| Next.js App Router | ✅ 完了 |
| React Server Components | ✅ 完了 |
| Sanityスキーマ設計 | ✅ 完了 |
| Portable Text | ✅ スキーマ定義完了 |
| Atomic Design | ✅ 完了 |
| Zustand状態管理 | ✅ 完了 |
| Server Actions | ✅ 完了 |
| GROQクエリ | ✅ 完了 |
| 画像最適化 | ✅ 設定完了 |
| Framer Motion | ✅ 完了 |
| スクローリーテリング | ✅ 完了 |
| Portable Textレンダリング | ✅ 完了 |
| 商品埋め込み機能 | ✅ 完了 |

---

## ⚠️ 既知の問題

### 1. Sanity接続エラー
**症状**: `https://demo.api.sanity.io` へのリクエストエラー
**原因**: 現在demoモードで設定されている
**解決方法**: 実際のSanityプロジェクトを作成し、プロジェクトIDを設定

### 2. コンテンツ未表示
**症状**: 商品・職人・ストーリーページが空
**原因**: Sanityにデータが入っていない
**解決方法**: Sanityスタジオでコンテンツを作成

---

## 🎯 デモ用サンプルデータ案

### 職人プロフィール例

#### 井波彫刻職人
```
氏名: 山田 一郎
工芸ジャンル: 井波彫刻
製作哲学: 200年続く伝統技法を守りながら、現代の暮らしに寄り添う作品づくり
経歴:
- 1985年 南砺市井波生まれ
- 2003年 祖父のもとで修行開始
- 2010年 伝統工芸士認定
- 2015年 独立
```

#### 五箇山和紙職人
```
氏名: 佐藤 花子
工芸ジャンル: 五箇山和紙
製作哲学: 五箇山の清らかな水と先人の技術で、心を込めて和紙を漉く
経歴:
- 1990年 東京都出身
- 2012年 五箇山に移住
- 2013年 和紙職人に弟子入り
- 2018年 独立
```

### 商品例
- 井波彫刻「欄間 鶴と松」 ¥280,000
- 五箇山和紙「手漉き便箋セット」 ¥3,800
- 井波彫刻「木彫りの小皿」 ¥8,500

---

## 📅 タイムライン

**2025年11月17日**
- ✅ プロジェクト作成
- ✅ 全スキーマ定義
- ✅ 全ページ実装
- ✅ コンポーネント実装
- ✅ ビルド成功確認
- ✅ README作成

**次回作業予定**
- Sanityプロジェクト作成
- コンテンツ投入
- 高度な機能実装

---

## 🔗 重要なURL

- **ローカル開発**: http://localhost:3001
- **Sanityスタジオ**: http://localhost:3001/studio
- **Sanity公式**: https://www.sanity.io
- **Next.js公式**: https://nextjs.org
- **Vercel**: https://vercel.com

---

## 📞 次回再開時のチェックリスト

□ `.env.local`のプロジェクトID確認
□ `npm run dev`でサーバー起動
□ `npx sanity dev`でスタジオ起動
□ http://localhost:3001 で動作確認
□ Sanityでコンテンツ作成開始

---

## 🎯 デプロイまでの流れ

### ステップ1: GitHubリポジトリ作成
```bash
# Gitリポジトリ初期化（既に完了）
git add .
git commit -m "Initial commit: Monogatari EC complete implementation"

# GitHubで新規リポジトリ作成後
git remote add origin https://github.com/<ユーザー名>/monogatari-ec.git
git branch -M main
git push -u origin main
```

### ステップ2: Vercelでデプロイ
1. https://vercel.com にアクセス
2. GitHubアカウントでログイン
3. 「Import Project」をクリック
4. GitHubリポジトリ「monogatari-ec」を選択
5. 環境変数を設定：
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: `oa68x7h8`
   - `NEXT_PUBLIC_SANITY_DATASET`: `production`
6. 「Deploy」をクリック

### ステップ3: Sanity CORS設定（本番URL）
デプロイ後、VercelのURLを取得（例: `https://monogatari-ec.vercel.app`）
Sanity管理画面で本番URLをCORS Originに追加

### ステップ4: QRコード生成
デプロイ完了後、VercelのURLからQRコードを生成
- オンラインツール: https://www.qr-code-generator.com/
- または、QRコードコンポーネントを追加

---

---

## 📊 プロジェクト最終状態

**メモ最終更新**: 2025年11月25日 17:00

### 実装完了項目
- ✅ Next.js + TypeScript + Tailwind CSS 基盤構築
- ✅ Sanity.io CMS統合（プロジェクトID: oa68x7h8）
- ✅ 全スキーマ定義（職人、商品、ストーリー）
- ✅ Portable Textレンダリングシステム
- ✅ 3種類の商品埋め込みレイアウト
- ✅ 3種類のスクローリーテリングアニメーション
- ✅ Zustandカート機能
- ✅ サンプルデータ自動インポート（7件）
- ✅ ビルド成功確認

### 次回作業項目
1. 🔴 データ表示確認（優先度：高）
2. 🟡 GitHubプッシュ → Vercelデプロイ（優先度：中）
3. 🟢 コンテンツ充実（優先度：低）

### 環境情報
- **開発サーバー**: http://localhost:3001
- **Sanityスタジオ**: http://localhost:3001/studio
- **プロジェクトID**: oa68x7h8
- **データセット**: production (public)
- **サンプルデータ**: 職人2人、商品3点、ストーリー2本

### 次回再開コマンド
```bash
cd /Users/yamamotoyuuki/Desktop/なんちゃれ/monogatari-ec
npm run dev
# → http://localhost:3001 で動作確認
```

**ビルド状態**: ✅ 成功
**実装進捗**: 約85%完了（デプロイ待ち）
