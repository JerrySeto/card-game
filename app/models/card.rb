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
    Card.where('name like ?', "%#{query}%")
  end

  def self.sorted
    order(:card_type, :name)
  end


end
