class Moderator::StoreController < Moderator::BaseController
  wrap_parameters Store, include: []
  def show
    # 店舗詳細（モデレーター専用）
    @store = Store.find(params[:id])
    render json: @store
  end

  def update
    # 店舗更新
    store = Store.find(params[:id])
    if store.update(store_params)
      render json: store, status: :ok
    else
      render json: { errors: store.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def check_in_qr
    store = Store.find(params[:id])
    token = CheckinQrTokenService.issue(store.id)

    # QRコードを生成（rqrcode gem）
    qr = RQRCode::QRCode.new(token)
    png = qr.as_png(size: 200)

    # レスポンスはPNG画像を直接返す
    send_data png.to_s, type: 'image/png', disposition: 'inline'
  end

  def posts
    # 店舗への投稿一覧
    store = current_moderator.store
    @posts = store.posts.includes(:user)

    render formats: :json
  end

  private

  def store_params
    params.permit(
      :id, :name, :description, :postal_code, :address, :phone_number,
      place_types: [], other_info: [], opening_hours: [:mon, :tue, :wed, :thu, :fri, :sat, :sun]
    )
  end
end
