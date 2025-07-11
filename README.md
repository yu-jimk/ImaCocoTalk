# ImaCocoTalk

## 概要

ImaCocoTalk は、Ruby on Rails（API）と Next.js を使用したモダンな Web アプリケーションです。

## 技術スタック

### バックエンド

- **Ruby on Rails** (API モード)
- **MySQL 8.0** (データベース)
- **Docker** (コンテナ化)

### フロントエンド

- **Next.js 15.3.4** (React フレームワーク)
- **TypeScript** (型安全性)
- **Tailwind CSS 4** (スタイリング)
- **ESLint** (コード品質)

### インフラ

- **Docker & Docker Compose** (開発・本番環境)
- **MySQL** (データベース)

## プロジェクト構成

```bash
ImaCocoTalk/
├── backend/ # Rails API
├── frontend/ # Next.js フロントエンド
│ └── app/ # Next.js アプリケーション
├── docker-compose-dev.yml # 開発環境用 Docker 設定
├── docker-compose-prod.yml # 本番環境用 Docker 設定
└── README.md
```

## セットアップ

### 前提条件

- Docker & Docker Compose
- Node.js 18+ (ローカル開発時)
- Git

### 環境変数の設定

1. 環境変数ファイルを作成：

```bash
cp .env.example .env
```

1. .env ファイルを編集して必要な値を設定：

### データベース設定

```env
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DB=ImaCocoTalk_development
MYSQL_USER=app_user
MYSQL_PASSWORD=your_password
```

### Rails 設定

```env
RAILS_ENV=development
SECRET_KEY_BASE=your_secret_key
```

### 開発環境での起動

1. プロジェクトをクローン：

```bash
git clone <https://github.com/yu-jimk/ImaCocoTalk>
cd ImaCocoTalk
```

1. Docker Compose で開発環境を起動：

```bash
docker-compose -f docker-compose-dev.yml up -d
```

1. データベースのセットアップ（初回のみ）：

```bash
docker-compose -f docker-compose-dev.yml exec backend rails db:create db:migrate db:seed
```

1. アプリケーションにアクセス：
   - フロントエンド: <http://localhost:8000>
   - バックエンド API: <http://localhost:3000>
   - データベース: localhost:3306

### ローカル開発（フロントエンドのみ）

```bash
cd frontend/app
npm install
npm run dev
```

## 本番環境での起動

```bash
docker-compose -f docker-compose-prod.yml up -d
```

## 開発コマンド

### バックエンド（Rails）

#### コンテナに入る

```bash
docker-compose -f docker-compose-dev.yml exec backend bash
```

#### マイグレーション実行

```bash
docker-compose -f docker-compose-dev.yml exec backend rails db:migrate
```

#### シード実行

```bash
docker-compose -f docker-compose-dev.yml exec backend rails db:seed
```

#### コンソール起動

```bash
docker-compose -f docker-compose-dev.yml exec backend rails console
```

#### テスト実行

```bash
docker-compose -f docker-compose-dev.yml exec backend rails test
```

### フロントエンド（Next.js）

```bash
cd frontend/app
```

#### 開発サーバー起動

```bash
npm run dev
```

#### ビルド

```bash
npm run build
```

#### 本番サーバー起動

```bash
npm run start
```

#### リント実行

```bash
npm run lint
```

### Docker 操作

#### 開発環境起動

```bash
docker-compose -f docker-compose-dev.yml up -d
```

#### 開発環境停止

```bash
docker-compose -f docker-compose-dev.yml down
```

#### ログ確認

```bash
docker-compose -f docker-compose-dev.yml logs -f [service-name]
```

#### データベースリセット

```bash
docker-compose -f docker-compose-dev.yml down -v
```

## API 仕様

バックエンド API のベース URL: http://localhost:3001

### エンドポイント一覧

作成中

## データベース

### ER 図

作成中

## トラブルシューティング

### よくある問題

1. **ポートが既に使用されている**

# ポート使用状況確認

```bash
lsof -i :3000
lsof -i :8000
lsof -i :3306
```

2. **データベース接続エラー**

# コンテナ再起動

```bash
docker-compose -f docker-compose-dev.yml restart db
```

3. **フロントエンドのビルドエラー**

```bash
cd frontend/app
rm -rf .next node_modules
npm install
npm run build
```
