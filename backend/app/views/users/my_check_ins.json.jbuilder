json.array! @check_ins do |check_in|
  json.id check_in.id
  json.store_id check_in.store.id 
  json.name check_in.store.name
  json.genre check_in.store.place_types || []
  json.date check_in.created_at.strftime("%Y/%m/%d %H:%M")
end
