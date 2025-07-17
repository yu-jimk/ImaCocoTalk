json.totalCount @total_count

json.posts @posts do |post|
  json.id post.id
  json.user do
    json.name post.user.name
    json.avatar post.user.gravatar_url(size: 80)
  end
  json.content post.content
  json.timestamp "#{time_ago_in_words(post.created_at)}前"
  json.likes post.likes_count
  json.comments 0
  json.isLiked post.liked_by?(@current_user)
  json.rating post.rating.to_f.round(1)
  json.store do
    json.name post.store.name
  end
end
