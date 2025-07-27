json.stores @stores_with_distance do |store|
  json.id store.id
  json.name store.name
  json.genre store.place_types
  json.distance "#{store.distance_m}m"
  json.posts store.posts.size
  json.rating store.average_rating || 0
  json.lat store.latitude
  json.lng store.longitude
  json.isNew store.created_at > 7.days.ago
  json.pinnedPosts store.announcements.order(updated_at: :desc).map(&:content)
end

json.available_genres @available_genres