# Docker Composeファイル名
DC_FILE=docker-compose-dev.yml

############################################
# 🐳 Docker 基本操作
############################################

# コンテナをバックグラウンドで起動
up:
	docker-compose -f $(DC_FILE) up -d $(filter-out $@,$(MAKECMDGOALS))

# コンテナを停止・削除
down:
	docker-compose -f $(DC_FILE) down $(filter-out $@,$(MAKECMDGOALS))

# コンテナを再起動
restart:
	docker-compose -f $(DC_FILE) down
	docker-compose -f $(DC_FILE) up -d

# Dockerイメージをビルド
build:
	docker-compose -f $(DC_FILE) build $(filter-out $@,$(MAKECMDGOALS))

# ログをリアルタイムで表示
logs:
	docker-compose -f $(DC_FILE) logs -f

# 起動中のコンテナ一覧を表示
ps:
	docker-compose -f $(DC_FILE) ps

# 未使用ボリュームを削除
prune:
	docker volume prune -f

############################################
# 🗄️ DB（MySQL）
############################################

# MySQLコンテナに入る（rootログイン）
mysql:
	docker-compose -f $(DC_FILE) exec db mysql -u root -p

# DBを初期化（drop → create → migrate → seed）
db-reset:
	docker-compose -f $(DC_FILE) exec backend bundle exec rails db:drop db:create db:migrate db:seed

# DBをdropする
db-drop:
	docker-compose -f $(DC_FILE) exec backend bundle exec rails db:drop

# DBをcreateする
db-create:
	docker-compose -f $(DC_FILE) exec backend bundle exec rails db:create

# マイグレーションを実行
migrate:
	docker-compose -f $(DC_FILE) exec backend bundle exec rails db:migrate

# シードデータを投入
seed:
	docker-compose -f $(DC_FILE) exec backend bundle exec rails db:seed

############################################
# 🛠️ Backend（Rails API）
############################################

# backendコンテナに入る
backend:
	docker-compose -f $(DC_FILE) exec backend bash

# Railsコンソールを起動
console:
	docker-compose -f $(DC_FILE) exec backend bundle exec rails console

# ルーティング一覧を表示
routes:
	docker-compose -f $(DC_FILE) exec backend bundle exec rails routes

# Railsテストを実行
test:
	docker-compose -f $(DC_FILE) exec backend bundle exec rails test

# 任意のRailsコマンドを実行（bundle exec付き）
rails:
	docker-compose -f $(DC_FILE) exec backend bundle exec rails $(filter-out $@,$(MAKECMDGOALS))

# Gemをインストール
bundle:
	docker-compose -f $(DC_FILE) exec backend bundle install

# コントローラを生成
g-controller:
	docker-compose -f $(DC_FILE) exec backend bundle exec rails g controller $(filter-out $@,$(MAKECMDGOALS))

# モデルを生成
g-model:
	docker-compose -f $(DC_FILE) exec backend bundle exec rails g model $(filter-out $@,$(MAKECMDGOALS))

# スキャフォールドを生成
g-scaffold:
	docker-compose -f $(DC_FILE) exec backend bundle exec rails g scaffold $(filter-out $@,$(MAKECMDGOALS))

# モデルを削除
d-model:
	docker-compose -f $(DC_FILE) exec backend bundle exec rails d model $(filter-out $@,$(MAKECMDGOALS))

# コントローラを削除
d-controller:
	docker-compose -f $(DC_FILE) exec backend bundle exec rails d controller $(filter-out $@,$(MAKECMDGOALS))

# スキャフォールドを削除
d-scaffold:
	docker-compose -f $(DC_FILE) exec backend bundle exec rails d scaffold $(filter-out $@,$(MAKECMDGOALS))

############################################
# 🌐 Frontend（Next.js + Yarn）
############################################

# frontendコンテナに入る
frontend:
	docker-compose -f $(DC_FILE) exec frontend sh

# 任意のYarnコマンドを実行
yarn:
	docker-compose -f $(DC_FILE) exec frontend yarn $(filter-out $@,$(MAKECMDGOALS))

# 任意のNpxコマンドを実行
npx:
	docker-compose -f $(DC_FILE) exec frontend npx $(filter-out $@,$(MAKECMDGOALS))

# Npxコマンドを実行
npx-shadcn-add:
	docker-compose -f $(DC_FILE) exec frontend npx shadcn@latest add $(word 2, $(MAKECMDGOALS))

# 余分なターゲット（たとえば input や button）でエラーが出ないようにする
%:
	@:

############################################
# 📘 ヘルプ
############################################

help:
	@echo "🐳 Docker"
	@echo "  make up               # サービス起動"
	@echo "  make down             # サービス停止＆削除"
	@echo "  make restart          # サービス再起動"
	@echo "  make build            # Dockerイメージビルド"
	@echo "  make logs             # コンテナログ表示"
	@echo "  make ps               # コンテナ一覧表示"
	@echo "  make prune            # 未使用ボリューム削除"
	@echo ""
	@echo "🗄️ DB操作"
	@echo "  make mysql            # MySQLに入る"
	@echo "  make db-reset         # DB初期化(drop→create→migrate→seed)"
	@echo "  make db-drop          # DB削除"
	@echo "  make db-create        # DB作成"
	@echo "  make migrate          # マイグレーション実行"
	@echo "  make seed             # シード投入"
	@echo ""
	@echo "🛠️ Rails (Backend)"
	@echo "  make backend          # backendコンテナに入る"
	@echo "  make console          # Railsコンソール"
	@echo "  make routes           # ルーティング一覧表示"
	@echo "  make test             # Railsテスト実行"
	@echo "  make bundle           # Gemインストール"
	@echo "  make rails xxx        # 任意のRailsコマンド実行（例: make rails db:migrate）"
	@echo "  make g-controller Xxx # コントローラ生成（例: make g-controller Users index show）"
	@echo "  make g-model Xxx      # モデル生成（例: make g-model Post title:string body:text）"
	@echo "  make g-scaffold Xxx   # スキャフォールド生成（例: make g-scaffold Task name:string done:boolean）"
	@echo "  make d-model Xxx      # モデル削除"
	@echo "  make d-controller Xxx # コントローラ削除"
	@echo "  make d-scaffold Xxx   # スキャフォールド削除"
	@echo ""
	@echo "🌐 Next.js (Frontend)"
	@echo "  make frontend         # frontendコンテナに入る"
	@echo "  make yarn-cmd xxx     # 任意のYarnコマンド実行（例: make yarn-cmd dev）"
