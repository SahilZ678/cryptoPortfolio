Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :assets, only: [:index, :show, :create, :update, :destroy]
    end
  end


  get '*path', to: 'homepage#index', via: :all, constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
  root 'homepage#index'
end
