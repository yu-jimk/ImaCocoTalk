class Moderator::DashboardController < Moderator::BaseController
  def summary
    store = current_moderator.store

    @store = store
    @total_posts = store.posts.count
    @total_reports = store.reports.count
    @monthly_visitors = store.check_ins.where("created_at >= ?", 1.month.ago).count
    @qr_code_value = "https://imacoco-talk.com/checkin/#{store.id}"
  end
end
