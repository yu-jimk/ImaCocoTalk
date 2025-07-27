class Moderator::AnnouncementsController < Moderator::BaseController
  def create
    # お知らせ作成
    @announcement = current_moderator.store.announcements.build(announcement_params)

    if @announcement.save
      render json: { success: true, id: @announcement.id }, status: :created
    else
      render json: { success: false, errors: @announcement.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    # お知らせ一覧
    @announcements = current_moderator.store.announcements.order(created_at: :desc)
  end

  def update
    # お知らせ更新
    @announcement = current_moderator.store.announcements.find(params[:id])

    if @announcement.update(announcement_params)
      render json: { success: true }
    else
      render json: { success: false, errors: @announcement.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    # お知らせ削除
    @announcement = current_moderator.store.announcements.find(params[:id])
    @announcement.destroy!
    head :no_content
  end

  private

  def announcement_params
    params.require(:announcement).permit(:content)
  end
end
