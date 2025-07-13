class Moderator < ApplicationRecord
  belongs_to :store

  has_secure_password

  validates :email, presence: true, uniqueness: true, length: { maximum: 255 }
end
