Rails.application.routes.draw do
  devise_for :accounts
  root 'landing#index'
end
