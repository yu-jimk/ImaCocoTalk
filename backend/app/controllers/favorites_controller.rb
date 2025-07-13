class FavoritesController < ApplicationController
  before_action :set_favorite, only: %i[ show update destroy ]

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


  # GET /favorites
  def index
    @favorites = Favorite.all

    render json: @favorites
  end

  # GET /favorites/1
  def show
    render json: @favorite
  end

  # POST /favorites
  def create
    @favorite = Favorite.new(favorite_params)

    if @favorite.save
      render json: @favorite, status: :created, location: @favorite
    else
      render json: @favorite.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /favorites/1
  def update
    if @favorite.update(favorite_params)
      render json: @favorite
    else
      render json: @favorite.errors, status: :unprocessable_entity
    end
  end

  # DELETE /favorites/1
  def destroy
    @favorite.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_favorite
      @favorite = Favorite.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def favorite_params
      params.require(:favorite).permit(:user_id, :store_id)
    end
end
