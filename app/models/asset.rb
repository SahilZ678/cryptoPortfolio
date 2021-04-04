class Asset < ApplicationRecord
  scope :order_descending, -> { order(created_at: desc)}

  belongs_to :user

  validates :cost_price, :quantity, :symbol, presence: true
end
