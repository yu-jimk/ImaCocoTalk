class Store < ApplicationRecord
  validates :name, presence: true, length: { maximum: 100 }
  validates :latitude, :longitude, presence: true, numericality: true

  has_many :moderators, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :check_ins, dependent: :destroy
  has_many :announcements, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :favorite_users, through: :favorites, source: :user
end
