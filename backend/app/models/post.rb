class Post < ApplicationRecord
  belongs_to :user
  belongs_to :store

  validates :user_id, presence: true
  validates :store_id, presence: true
  validates :rating, presence: true,
                     numericality: { greater_than_or_equal_to: 0.0, less_than_or_equal_to: 5.0 }
  validates :content, presence: true, length: { minimum: 1 }

  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user
  has_many :reports, dependent: :destroy

  # いいね数
  def likes_count
    likes.size
  end

  # 評価（rating）はDBカラムとして保存されている想定
  def rating
    read_attribute(:rating) || 0.0
  end

  # ログインユーザーがいいね済みか判定用（引数にユーザー渡す形が理想）
  def liked_by?(user)
    return false if user.nil?
    likes.exists?(user_id: user.id)
  end
end
