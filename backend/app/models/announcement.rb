class Announcement < ApplicationRecord
  belongs_to :store

  validates :content, presence: true
end
