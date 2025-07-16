class Moderator::StoreController < Moderator::BaseController
  def show
    # 店舗詳細（モデレーター専用）
    @store = Store.find(params[:id])
    render json: @store
  end

  def update
    # 店舗更新
  end

  def qrcode
    # チェックインQR表示
  end

  def posts
    # 店舗への投稿一覧
  end
end
