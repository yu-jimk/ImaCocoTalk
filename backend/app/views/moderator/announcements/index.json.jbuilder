json.array! @announcements do |announcement|
  json.id announcement.id
  json.content announcement.content
  json.timestamp time_ago_in_words(announcement.created_at) + "前"
end
