module CardsHelper
  def cost_to_symbols(cost)
    cost.scan /\d+|Wi|Wa|Et|Ea|Fi|X/
  end
end
