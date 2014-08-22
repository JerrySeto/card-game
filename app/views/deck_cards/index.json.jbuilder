json.array!(@deck_cards) do |deck_card|
  json.extract! deck_card, :id, :deck_id, :card_id
  json.url deck_card_url(deck_card, format: :json)
end
