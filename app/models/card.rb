class Card < ActiveRecord::Base
  def self.search_by_name(query)
    Card.where('name like ?', "%#{query}%")
  end
end
