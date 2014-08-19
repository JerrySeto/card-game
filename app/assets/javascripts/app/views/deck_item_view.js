App.Views.DeckItemView = Backbone.View.extend({
  className: 'deck-item card-item',
  template: App.addTemplate('#deck-item-view'),
  bindings: {
    '.name' : 'name',
    '.amount' : 'amount'
  },
  events: {
    'click .add-btn': 'triggerAdd',
    'click .remove-btn': 'triggerRemove',
    'click div' : 'triggerClicked'
  },
  render: function(){
    this.$el.append(this.template(this.model.toJSON()))
    this.stickit()
    return this.el
  },
  triggerRemove: function(){
    this.trigger('remove', this)
  },
  triggerAdd: function(){
    this.trigger('add', this.card())
  },
  triggerClicked: function(){
    this.trigger('clicked', this.card())
  },
  card: function(){
    return new App.Models.Card({
      id: this.model.get('card_id')
    })
  }
})
