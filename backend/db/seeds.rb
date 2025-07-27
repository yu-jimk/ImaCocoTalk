# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'faker'

Faker::Config.locale = :ja
base_lat = 35.6762
base_lng = 139.6503

PLACE_TYPES = %w[
  カフェ
  レストラン
  バー
  ベーカリー
  ファストフード
  居酒屋
  ラーメン
  カレー
  寿司
  中華料理
  イタリアン
  韓国料理
  ステーキハウス
  ビュッフェ
  定食屋
]

OTHER_INFO_OPTIONS = [
  "Wi-Fi完備",
  "電源あり",
  "禁煙",
  "喫煙可",
  "テイクアウト可",
  "ペット同伴可",
  "個室あり",
  "予約可",
  "駐車場あり",
  "子連れ歓迎",
  "ベジタリアン対応",
  "深夜営業",
  "朝食あり",
  "英語メニューあり",
  "クレジットカード可"
]

OPENING_HOURS = [
  ["7:00", "21:00"],
  ["8:00", "22:00"],
  ["9:00", "22:00"],
  ["10:00", "23:00"],
  ["8:30", "21:30"],
  ["9:00", "20:00"],
  ["7:30", "19:00"]
]

DAYS = %w[mon tue wed thu fri sat sun]

# ランダムな営業時間を生成
def generate_opening_hours
  DAYS.map do |day|
    open_time, close_time = OPENING_HOURS.sample
    [day, "#{open_time}-#{close_time}"]
  end.to_h
end

# Users
users = 10.times.map do
  User.create!(
    name: Faker::Name.name,
    email: Faker::Internet.unique.email,
    password: 'password',
    bio: Faker::Lorem.sentence
  )
end

stores = []

# 最初に1件だけ30m圏内の座標を作成
stores << Store.create!(
  name: "#{Faker::Address.city}レストラン（近場）",
  description: Faker::Lorem.paragraph,
  postal_code: Faker::Address.postcode,
  address: Faker::Address.full_address,
  latitude: base_lat,
  longitude: base_lng,
  phone_number: Faker::PhoneNumber.phone_number,
  opening_hours: generate_opening_hours,
  place_types: PLACE_TYPES.sample(rand(1..3)),
  other_info: OTHER_INFO_OPTIONS.sample(rand(2..5))
)

# 残り4件は5km圏内ランダムで作成
4.times do
  stores << Store.create!(
    name: "#{Faker::Address.city}レストラン",
    description: Faker::Lorem.paragraph,
    postal_code: Faker::Address.postcode,
    address: Faker::Address.full_address,
    latitude: base_lat + rand(-0.01..0.01).round(7),
    longitude: base_lng + rand(-0.01..0.01).round(7),
    phone_number: Faker::PhoneNumber.phone_number,
    opening_hours: generate_opening_hours,
    place_types: PLACE_TYPES.sample(rand(1..3)),
    other_info: OTHER_INFO_OPTIONS.sample(rand(2..5))
  )
end

# Moderators
stores.each do |store|
  Moderator.create!(
    store: store,
    email: Faker::Internet.unique.email,
    password: 'password'
  )
end

# Posts
posts = []
users.each do |user|
  stores.each do |store|
    posts << Post.create!(
      user: user,
      store: store,
      content: Array(Faker::Coffee.notes).join('、'),
      rating: [2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0].sample
    )
  end
end

# Likes
posts.each do |post|
  users.sample(rand(3..6)).each do |user|
    Like.find_or_create_by!(user: user, post: post)
  end
end

# Favorites
users.each do |user|
  stores.sample(rand(1..3)).each do |store|
    Favorite.find_or_create_by!(user: user, store: store)
  end
end

# CheckIns
users.each do |user|
  stores.each do |store|
    CheckIn.create!(
      user: user,
      store: store,
      latitude: store.latitude,
      longitude: store.longitude,
      qr_token: SecureRandom.hex(32)
    )
  end
end

# Reports
posts.sample(10).each do |post|
  user = (users - [post.user]).sample
  Report.create!(
    user: user,
    post: post,
    reason: Report::REASONS.sample
)
end

# Announcements
stores.each do |store|
  3.times do
    Announcement.create!(
      store: store,
      content: "#{Faker::Company.name}より: #{Faker::Lorem.sentence}"
    )
  end
end
