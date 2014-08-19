json.array!(@cards) do |card|
  json.extract! card, :id, :card_type, :cost, :rules_text, :power, :toughness, :rarity, :name, :created_at, :updated_at, :color
  json.url card_url(card, format: :json)
end
