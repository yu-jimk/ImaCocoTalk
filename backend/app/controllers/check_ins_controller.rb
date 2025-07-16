class CheckInsController < BaseController

  def validate
    # GPS / QRコードチェックイン検証
  end

  # POST /check_ins
  def create
    @check_in = CheckIn.new(check_in_params)

    if @check_in.save
      render json: @check_in, status: :created, location: @check_in
    else
      render json: @check_in.errors, status: :unprocessable_entity
    end
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
