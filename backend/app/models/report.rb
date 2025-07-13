class Report < ApplicationRecord
  belongs_to :user
  belongs_to :post

  REASONS = %w[inappropriate spam harassment false_info copyright other].freeze
  validates :reason, presence: true, inclusion: { in: REASONS }
end
