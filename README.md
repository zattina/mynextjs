# Next.js Image Gallery with Cloudinary

Cloudinaryを使用した画像ギャラリーアプリケーションです。

## 機能

- Cloudinaryからの画像表示
- 画像詳細ページ
- レスポンシブデザイン
- 画像の最適化

## 技術スタック

- Next.js 14
- TypeScript
- Tailwind CSS
- Cloudinary

## 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 開発サーバーの起動

```bash
npm install
npm run dev
```

## デプロイ

このプロジェクトはVercelにデプロイすることを推奨します。デプロイ時に環境変数を設定してください。

## ライセンス

MIT
