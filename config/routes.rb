Rails.application.routes.draw do
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
end
