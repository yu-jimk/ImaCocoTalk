require 'digest/md5'

class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true, length: { maximum: 255 }
  validates :name, presence: true, length: { maximum: 50 }

  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_posts, through: :likes, source: :post
  has_many :favorites, dependent: :destroy
  has_many :favorite_stores, through: :favorites, source: :store
  has_many :check_ins, dependent: :destroy

  def favorited?(store)
    favorites.exists?(store_id: store.id)
  end

  # Gravatar URLを返すメソッド
  def gravatar_url(size: 80)
    email_address = email.downcase.strip
    hash = Digest::MD5.hexdigest(email_address)
    "https://www.gravatar.com/avatar/#{hash}?s=#{size}&d=identicon"
  end

  def join_date
    created_at.strftime("%Y年%-m月")
  end

  def total_posts
    posts.count
  end

  def total_checkins
    check_ins.count
  end

  def favorite_stores_count
    favorite_stores.count
  end

  def liked_posts_count
    liked_posts.count
  end

  def recently_checked_in_to?(store_id)
    check_ins.where(store_id: store_id).where('created_at >= ?', 30.minutes.ago).exists?
  end
end
