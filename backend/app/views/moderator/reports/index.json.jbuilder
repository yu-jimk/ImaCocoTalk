json.array! @posts do |post|
  json.id post.id
  json.user do
    json.name post.user.name.presence
    json.avatar post.user.gravatar_url(size: 80)
  end
  json.content post.content
  json.timestamp "#{time_ago_in_words(post.created_at)}前"
  json.reports post.reports_count
  json.reportReasons post.report_reasons
  json.rating post.rating
end
