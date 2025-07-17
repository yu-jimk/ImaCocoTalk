json.id @store.id
json.name @store.name
json.genres @store.place_types || []
json.address @store.address
json.postalCode @store.postal_code
json.distance "50m"
json.rating @store.average_rating
json.description @store.description
json.openHours @store.today_open_hours
json.phone @store.phone_number
json.features @store.other_info || []
json.user do
  json.isFavorited @is_favorited
end