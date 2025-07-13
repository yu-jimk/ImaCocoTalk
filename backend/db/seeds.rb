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

# Users
users = 10.times.map do
  User.create!(
    name: Faker::Name.name,
    email: Faker::Internet.unique.email,
    password: 'password',
    bio: Faker::Lorem.sentence
  )
end

# Stores
stores = 5.times.map do
  Store.create!(
    name: "#{Faker::Address.city}カフェ",
    description: Faker::Lorem.paragraph,
    postal_code: Faker::Address.postcode,
    address: Faker::Address.full_address,
    latitude: Faker::Address.latitude,
    longitude: Faker::Address.longitude,
    phone_number: Faker::PhoneNumber.phone_number,
    opening_hours: { mon: "10:00-20:00" },
    place_types: ["cafe", "restaurant"],
    other_info: { wifi: [true, false].sample }
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
      rating: rand(3.0..5.0).round(1)
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
