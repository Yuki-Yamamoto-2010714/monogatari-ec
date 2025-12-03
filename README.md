# ものがたりEC

南砺市の伝統工芸品を、職人の物語とともにお届けするECサイト

## プロジェクト概要

「ものがたりEC」は、南砺市「なんチャレ2025」起業チャレンジ部門で提案される事業のモックアップです。井波彫刻や五箇山和紙といった伝統工芸品を、職人の哲学、歴史的背景、製作過程という「物語」を通じて顧客に届けます。

## 技術スタック

### フロントエンド
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (スクローリーテリング用)

### CMS
- **Sanity.io**
  - 構造化コンテンツ管理
  - Portable Text
  - 画像最適化

### 状態管理
- **Zustand** (カート状態管理)

### その他
- **Next/Image** (画像最適化)
- **Server Actions** (カート操作)

## セットアップ

### 1. 依存関係のインストール

```bash
cd monogatari-ec
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルはすでに作成されています（デモモード）。
本番環境では、Sanityプロジェクトを作成して以下を設定してください:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. 開発サーバーの起動

```bash
# Next.js開発サーバー
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### 4. Sanity Studioの起動

別のターミナルで以下を実行:

```bash
npx sanity dev
```

ブラウザで [http://localhost:3000/studio](http://localhost:3000/studio) を開いてSanityスタジオにアクセスできます。

## プロジェクト構造

```
monogatari-ec/
├── app/                    # Next.js App Router
│   ├── page.tsx           # トップページ
│   ├── products/          # 商品ページ
│   ├── artisans/          # 職人プロフィールページ
│   ├── stories/           # ストーリーページ
│   └── cart/              # カートページ
├── components/
│   ├── atoms/             # Atomic Design: ボタンなど
│   ├── molecules/         # 商品カード、カートアイコンなど
│   └── organisms/         # ヘッダー、フッター
├── lib/
│   └── sanity/            # Sanityクライアント、GROQクエリ
├── sanity/
│   └── schemas/           # Sanityスキーマ定義
│       ├── artisan.ts     # 職人スキーマ
│       ├── product.ts     # 商品スキーマ
│       └── story.ts       # ストーリースキーマ
├── stores/
│   └── cart-store.ts      # Zustandカートストア
├── types/
│   └── index.ts           # TypeScript型定義
└── actions/
    └── cart.ts            # Server Actions
```

## コンテンツスキーマ

### 1. Artisan（職人）
- 氏名、ポートレート写真
- 工芸ジャンル（井波彫刻、五箇山和紙など）
- 製作哲学・想い
- 経歴・沿革
- インタビュー動画URL
- 工房情報

### 2. Product（商品）
- 商品名、画像、価格
- 短い説明、物語的商品説明
- 製作職人への参照
- カテゴリー、仕様・スペック
- 在庫状況、特集商品フラグ
- 関連ストーリーへの参照

### 3. Story（ストーリー記事）
- タイトル、メインビジュアル
- 関連職人への参照
- 本文（Portable Text）
  - 商品カード埋め込み機能
  - スクローリーテリングセクション
  - 画像、引用など
- 特集記事フラグ

## 主要機能

### ✅ 実装済み
- [x] ヘッドレスコマース基盤
- [x] Sanityスキーマ（Artisan, Product, Story）
- [x] レスポンシブデザイン
- [x] カート機能（Zustand + LocalStorage）
- [x] ページ構造（トップ、商品、職人、ストーリー、カート）
- [x] 画像最適化設定
- [x] ビルド成功確認

### 🚧 今後の拡張
- [ ] Sanityダミーデータの投入
- [ ] 実際のSanityデータとの連携
- [ ] Portable Textレンダリング実装
- [ ] Framer Motionスクローリーテリング実装
- [ ] 決済機能（Shopify連携）
- [ ] 検索・フィルタリング機能
- [ ] 多言語対応

## 使用方法

### Sanityスタジオでコンテンツを作成

1. Sanity Studioを起動: `npx sanity dev`
2. `http://localhost:3000/studio` にアクセス
3. 職人、商品、ストーリーのコンテンツを作成
4. フロントエンドに自動的に反映されます

### ビルド

```bash
npm run build
```

### 本番起動

```bash
npm run start
```

## デプロイ

### Vercel（推奨）

1. GitHubにプッシュ
2. Vercelで新規プロジェクト作成
3. 環境変数を設定
4. デプロイ

## ライセンス

このプロジェクトは「なんチャレ2025」起業チャレンジ部門の提案用モックアップです。

## 開発者

南砺市「なんチャレ2025」起業チャレンジ部門 - ものがたりEC チーム

---

**Created for なんチャレ2025 起業チャレンジ部門**
