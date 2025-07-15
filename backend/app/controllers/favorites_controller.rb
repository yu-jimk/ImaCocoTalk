class FavoritesController < ApplicationController

  # POST /favorites/toggle
  def toggle
    store = Store.find(params[:store_id])
    favorite = current_user.favorites.find_by(store: store)

    if favorite
      favorite.destroy
      render json: { status: 'removed', store_id: store.id }
    else
      current_user.favorites.create!(store: store)
      render json: { status: 'added', store_id: store.id }
    end
  end

end
