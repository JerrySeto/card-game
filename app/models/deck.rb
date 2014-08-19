class Deck < ActiveRecord::Base
  has_many :deck_cards
  has_many :cards, :through => :deck_cards

  def number_of_copies_of(card)
    deck_cards.where(:card => card).sum(:amount)
  end
end
