json.array! stores do |store|
  json.id store.id
  json.store_id store.id
  json.name store.name
  json.genre store.place_types || []
  json.visits store.check_ins.count
  json.isFavorite true
end