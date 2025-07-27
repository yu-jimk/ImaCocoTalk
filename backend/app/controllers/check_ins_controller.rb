class CheckInsController < BaseController

  def valid
    store_id = params[:store_id]
    valid = current_user.recently_checked_in_to?(store_id)

    render json: { valid: valid }
  end

  # POST /check_ins
  def create
    store = Store.find(params[:store_id])
    user_lat = params[:latitude].to_f
    user_lng = params[:longitude].to_f
  
    distance_km = Geocoder::Calculations.distance_between([user_lat, user_lng], [store.latitude, store.longitude])
    distance_m = (distance_km * 1000).round
  
    if distance_m > 30
      render json: { error: "店舗まで#{distance_m}m離れています（30m以内のみチェックイン可能）" }, status: :unprocessable_entity
      return
    end
  
    unless CheckinQrTokenService.valid?(store, params[:qr_token])
      render json: { error: "QRトークンが無効です" }, status: :unauthorized
      return
    end
  
    check_in = current_user.check_ins.create!(
      store: store,
      latitude: user_lat,
      longitude: user_lng,
      qr_token: params[:qr_token]
    )
  
    render :show, locals: { check_in: check_in }, status: :created
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_check_in
      @check_in = CheckIn.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def check_in_params
      params.require(:check_in).permit(:user_id, :store_id, :latitude, :longitude, :qr_token)
    end
end
