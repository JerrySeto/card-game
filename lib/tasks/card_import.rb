def params_from_array(array, color)
  #["Name", "Type", "Rarity", "Cost", "Power", "Toughness", "Rules Text"]

  {
    :name => array[0],
    :card_type => array[1],
    :rarity =>  array[2],
    :cost => array[3],
    :power => array[4],
    :toughness => array[5],
    :rules_text => array[6],
    :color => color
  }
end

file = File.open(ARGV[0])
lines = file.readlines.map{|line| line.split("\t")}.map{|line| line.map{|cell| cell.strip}}
lines[1..-1].each do |line|
  Card.create(params_from_array(line, ARGV[1]))
end

deck = Deck.create(:name => ARGV[1])
deck.cards << Card.where(:color => ARGV[1])
