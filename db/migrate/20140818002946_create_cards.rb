class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :card_type
      t.string :cost
      t.text :rules_text
      t.integer :power
      t.integer :toughness
      t.integer :rarity

      t.timestamps
    end
  end
end
