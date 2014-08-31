json.extract! @deck, :name
json.deck_cards do
  json.array!(@deck_cards) do |deck_card|
    json.extract! deck_card, :id, :deck_id, :card_id, :amount
    json.name deck_card.card.name
  end
end
