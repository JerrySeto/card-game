App.Models.Card = Backbone.Model.extend({
  urlRoot: '/cards',
  defaults: {
    card_type       : null, 
    cost            : null, 
    rules_text      : null, 
    power           : null, 
    toughness       : null, 
    rarity          : null, 
    created_at      : null, 
    updated_at      : null, 
    name            : null, 
    color           : null, 
  },

})