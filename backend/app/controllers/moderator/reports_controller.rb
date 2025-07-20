class Moderator::ReportsController < Moderator::BaseController
  def index
    # 通報された投稿一覧
    @posts = current_moderator.store.posts.includes(:user, :reports)
      .where(id: Report.select(:post_id))
  end

  def destroy
    # 通報承認 / 削除
    post = current_moderator.store.posts.find(params[:id])
    post.destroy!
    head :no_content
  end

  def approve
    post = current_moderator.store.posts.find(params[:id])
    post.reports.destroy_all # 承認＝通報だけ削除、投稿は残す
    head :no_content
  end
end
