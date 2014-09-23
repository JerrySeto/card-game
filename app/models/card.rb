class Card < ActiveRecord::Base
  VALID_COLORS = %w{
    Fire
    Water
    Wind
    Earth
    Ether
  }

  validates :color, inclusion: {in: Card::VALID_COLORS}
  def self.search_by_name(query)
    Card.where('lower(name) like lower(?)', "%#{query}%")
  end

  def self.sorted
    order(:card_type, :name)
  end
end
