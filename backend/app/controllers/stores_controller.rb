class StoresController < BaseController
  before_action :set_store, only: %i[ show update posts]

  def nearby
    lat = params[:lat].to_f
    lng = params[:lng].to_f
    radius = params[:radius] ? params[:radius].to_f : 5

    @stores = Store.near([lat, lng], radius, units: :km)
    @stores_with_distance = @stores.map do |store|
      distance_km = Geocoder::Calculations.distance_between([lat, lng], [store.latitude, store.longitude])
      store.define_singleton_method(:distance_m) { (distance_km * 1000).round }
      store
    end.sort_by(&:distance_m)

    # ユニークなジャンル配列
    @available_genres = @stores_with_distance.map(&:place_types).flatten.uniq

    render "stores/nearby"
  end

  # GET /stores/1
  def show
    @is_favorited = current_user&.favorited?(@store) || false
  end

  def posts
    page = params[:page].to_i > 0 ? params[:page].to_i : 1
    limit = params[:limit].to_i > 0 ? params[:limit].to_i : 20
    offset = (page - 1) * limit

    @current_user = current_user
    @posts = @store.posts.includes(:user, :likes).order(created_at: :desc).offset(offset).limit(limit)
    @total_count = @store.posts.count

  rescue ActiveRecord::RecordNotFound
    render json: { error: "Store not found" }, status: :not_found
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
