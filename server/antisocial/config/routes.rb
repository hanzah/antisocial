Rails.application.routes.draw do
  resources :beacons, only: [:show]
  resources :chat_rooms, only: [] do
    resources :comments, only: [:index, :create]
  end
  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'
end
