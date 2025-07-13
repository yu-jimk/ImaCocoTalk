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
end
