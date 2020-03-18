Rails.application.routes.draw do
  apipie
  get 'crm/index'
  root 'landing#index'

  mount Sidekiq::Web => '/queues'
  mount ActionCable.server => '/cable'

  devise_for :accounts,
  controllers: {
    sessions: 'accounts/sessions'
  }

  get '/serviceworker.js' => 'serviceworkers#serviceworker'
  get '/manifest.json' => 'serviceworkers#manifest'
  get '/offline.html' => 'serviceworkers#offline'
  post '/push' => 'serviceworkers#push'

  resources :dashboard
  resources :crm

  namespace :api do
    scope :v1, module: 'v1' do
      # devise_for :users, controllers: {
      #   sessions: 'api/v1/users',
      # }, skip: [:registrations, :password]

      # resources :users, only: [] do
      #   collection do
      #     get :verify_account
      #     post :sign_up
      #   end
      # end

      # resources :products, only: [:index] do
      #   collection do
      #     get :need_price
      #     patch :assign
      #     patch :price_report
      #     patch :cancel_price_report
      #   end
      # end
      # resources :addresses, only: [] do
      #   collection do
      #     resources :cities, only: [:show], controller: :addresses do
      #       resources :districts, only: [], controller: :addresses do
      #         get :district
      #         # resources :wards, only: [:index, :show], controller: :addresses
      #       end
      #     end
      #   end
      # end
      namespace :addresses do
        resources :cities, only: [:index, :show] do
          resources :districts, only: [:index, :show] do
            resources :wards, only: [:index, :show]
          end
        end
      end
    end
  end  
end
