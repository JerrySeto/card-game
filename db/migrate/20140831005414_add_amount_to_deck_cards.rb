class AddAmountToDeckCards < ActiveRecord::Migration
  def change
    add_column :deck_cards, :amount, :integer, :default => 1
  end
end
