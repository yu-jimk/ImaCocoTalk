Rails.application.routes.draw do
  scope :api do
    # 認証
    post "auth/signup", to: "auth#signup"
    post "auth/login",  to: "auth#login"
    post "auth/guest_login",  to: "auth#guest_login"
    delete "auth/logout", to: "auth#logout"

    # ユーザー
    get    "users/me",           to: "users#me"
    patch  "users/me",           to: "users#update_me"
    delete "users/me",           to: "users#destroy_me"
    get    "users/me/posts",     to: "users#my_posts"
    get    "users/me/check_ins", to: "users#my_check_ins"
    get    "users/me/favorites", to: "users#my_favorites"
    get    "users/me/likes",     to: "users#my_likes"

    # 店舗
    get "stores/nearby", to: "stores#nearby"
    get "stores/:id",    to: "stores#show"
    get "stores/:id/posts", to: "stores#posts"
    

    # 投稿
    resources :posts, only: [:create, :show, :update, :destroy] do
      post "report", on: :member
    end

    # いいね・お気に入り
    post "likes/toggle",      to: "likes#toggle"
    post "favorites/toggle",  to: "favorites#toggle"

    # チェックイン
    get "check_ins/valid", to: "check_ins#valid"
    resources :check_ins, only: [:create]

    # モデレーター
    namespace :moderator do
      post 'auth/login', to: 'auth#login'
      post "auth/guest_login",  to: "auth#guest_login"
      delete 'auth/logout', to: 'auth#logout'

      get "dashboard/summary", to: "dashboard#summary"
      get "store/:id/check_in_qr", to: "store#check_in_qr"
      get "store",             to: "store#show"
      patch "store",           to: "store#update"
      get "store/posts",       to: "store#posts"

      resources :reports, only: [:index, :destroy] do
        member do
          patch :approve
        end
      end
      resources :announcements, only: [:create, :index, :update, :destroy]
    end
  end

  # health check
  get "up" => "rails/health#show", as: :rails_health_check
end
