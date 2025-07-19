json.array! posts do |post|
  json.id post.id
  json.user do
    json.name post.user.name
    json.avatar post.user.gravatar_url(size: 80)
  end
  json.store do
    json.name post.store.name
  end
  json.content post.content
  json.timestamp "#{time_ago_in_words(post.created_at)}前"
  json.likes post.likes_count
  json.comments 0
  json.rating post.rating.to_f.round(1)
  json.isLiked true
end