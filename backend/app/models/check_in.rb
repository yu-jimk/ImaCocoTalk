class CheckIn < ApplicationRecord
  belongs_to :user
  belongs_to :store

  validates :qr_token, presence: true, length: { maximum: 64 }
  validates :latitude, numericality: true, allow_nil: true
  validates :longitude, numericality: true, allow_nil: true
end
