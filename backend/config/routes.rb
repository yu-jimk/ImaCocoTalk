Rails.application.routes.draw do  
  
  scope :api do
    resources :users, except: [:index]
    resources :stores, only: [:update, :show]
    resources :posts
    resources :check_ins, only: [:index, :show, :create, :destroy]
    resources :moderators, except: [:index]
    resources :announcements
    resources :reports, only: [:index, :show, :create, :destroy]
    resources :favorites, only: [] do
      collection do
        post :toggle
      end
    end
    resources :likes, only: [] do
      collection do
        post :toggle
      end
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
