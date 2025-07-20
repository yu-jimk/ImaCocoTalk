  json.id @store.id
  json.name @store.name
  json.genres @store.place_types || []
  json.description @store.description
  json.postalCode @store.postal_code
  json.address @store.address
  json.openHours @store.today_open_hours
  json.phone @store.phone_number
  json.otherInfo @store.other_info || []
  json.totalPosts @total_posts
  json.totalReports @total_reports
  json.monthlyVisitors @monthly_visitors
  json.qrCodeValue @qr_code_value
