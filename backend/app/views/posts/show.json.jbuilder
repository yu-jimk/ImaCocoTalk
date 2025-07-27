json.id @post.id.to_s
json.user do
  json.name @post.user.name
  json.avatar @post.user.gravatar_url(size: 80)
end
json.content @post.content
json.timestamp time_ago_in_words(@post.created_at) + "前"
json.likes @post.likes_count
json.isLiked @post.liked_by?(@current_user)
json.rating @post.rating
json.store do
  json.name @post.store.name
end
json.comments 0
