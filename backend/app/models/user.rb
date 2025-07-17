require 'digest/md5'

class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true, length: { maximum: 255 }
  validates :name, presence: true, length: { maximum: 50 }

  has_many :likes, dependent: :destroy
  has_many :liked_posts, through: :likes, source: :post
  has_many :favorites, dependent: :destroy
  has_many :favorite_stores, through: :favorites, source: :store

  def favorited?(store)
    favorites.exists?(store_id: store.id)
  end

  # Gravatar URLを返すメソッド
  def gravatar_url(size: 80)
    email_address = email.downcase.strip
    hash = Digest::MD5.hexdigest(email_address)
    "https://www.gravatar.com/avatar/#{hash}?s=#{size}&d=identicon"
  end
end
