class CheckIn < ApplicationRecord
  belongs_to :user
  belongs_to :store

  validates :qr_token, presence: true, length: { maximum: 255 }
  validates :latitude, numericality: true, allow_nil: true
  validates :longitude, numericality: true, allow_nil: true

  # 緯度経度から店舗までの距離を返す（メートル）
  def distance_to_store
    return nil unless latitude && longitude && store&.latitude && store&.longitude

    km = Geocoder::Calculations.distance_between(
      [latitude, longitude],
      [store.latitude, store.longitude]
    )
    (km * 1000).round
  end
end
