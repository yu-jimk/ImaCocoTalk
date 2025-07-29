FROM node:20
# 作業ディレクトリを設定
WORKDIR /usr/src/app
# package.json と yarn.lock を先にコピー（キャッシュを活かすため）
COPY app/package.json app/yarn.lock ./
# 依存関係をインストール
RUN yarn install
# アプリのソースコードをコピー
COPY app .