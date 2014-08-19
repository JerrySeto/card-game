App.Collections.Deck = Backbone.Collection.extend({
  model: App.Models.DeckCard,
  url: function(){
    return '/decks/' + this.id + '/deck_cards'
  },
  initialize: function(models, opts){
    this.id = opts.id
  },
  parse: function(response, opts){
    this.name = response.name
    return response.deck_cards
  }
})