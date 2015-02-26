Rails.application.routes.draw do
  root 'messages#inbox'
  get '/inbox', to: 'messages#inbox'

  resources :users, except: [:index, :show] do
    resources :messages, shallow: true
  end

  get '/users/current', to: 'users#current'

  resource :session, only: [:new, :create, :destroy]
end
