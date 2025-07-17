class Store < ApplicationRecord
  validates :name, presence: true, length: { maximum: 100 }
  validates :latitude, :longitude, presence: true, numericality: true

  has_many :moderators, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :check_ins, dependent: :destroy
  has_many :announcements, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :favorite_users, through: :favorites, source: :user

  def average_rating
    posts.average(:rating).to_f.round(1) || 0.0
  end

  def today_open_hours
    return nil unless opening_hours.present?
    hours = opening_hours.is_a?(String) ? JSON.parse(opening_hours) : opening_hours
    today_key = Date.today.strftime("%a").downcase
    hours[today_key]
  end
end
