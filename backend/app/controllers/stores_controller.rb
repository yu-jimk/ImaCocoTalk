class StoresController < BaseController
  before_action :set_store, only: %i[ show update ]

  def nearby

  end

  # GET /stores/1
  def show
    puts "current_user.id: #{current_user&.id}"
    puts "@store.id: #{@store.id}"
    puts "favorite store_ids: #{current_user.favorites.pluck(:store_id)}"
    puts "favorited?: #{current_user.favorited?(@store)}"
    @is_favorited = current_user&.favorited?(@store) || false
  end

  # PATCH/PUT /stores/1
  def update
    if @store.update(store_params)
      render json: @store
    else
      render json: @store.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_store
      @store = Store.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def store_params
      params.require(:store).permit(:name, :description, :postal_code, :address, :latitude, :longitude, :phone_number, :opening_hours, :place_types, :other_info)
    end
end
