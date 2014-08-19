App.Views.DeckListView = Backbone.View.extend({
  template: App.addTemplate('#deck-list-view'),
  initialize: function(){
    this.itemViews = [];
    this.listenTo(this.collection, 'reset', this.render)
    this.listenTo(this.collection, 'add', this.appendItem)
    this.listenTo(Backbone, 'search:add', this.addCard)
    this.listenTo(this.collection, 'change', _.debounce(this.saveChanges, 500))
  },
  render: function(){
    var self = this;
    var docFrag = document.createDocumentFragment()
    this.clearItemViews()
    this.collection.each(function(model){
      var newItem = self.addItemView(model)
      docFrag.appendChild(newItem.render())
    })

    this.$el.append(docFrag)
    return this.el
  },
  onClose: function(){
    this.clearItemViews()
  },
  clearItemViews: function(){
    for(i=0, l=this.itemViews.length; i<l; i++){
      this.itemViews[i].close()
    }
    this.itemViews.length = 0;
  },
  addItemView: function(model){
    var newItem = new App.Views.DeckItemView({
      model: model
    })
    this.listenTo(newItem, 'remove', this.removeItem)
    this.listenTo(newItem, 'add', this.addCard)
    this.listenTo(newItem, 'clicked', this.getPreview)
    this.itemViews.push(newItem)

    return newItem
  },
  removeItemView: function(view){
    var index = this.itemViews.indexOf(view);
    this.itemViews.splice(index, 1);
    view.close();
  },
  appendItem: function(model){
    this.$el.append(this.addItemView(model).render())
    this.saveChanges(model)
  },
  addCard: function(card){
    var deckCard = this.collection.findWhere({card_id: card.id})
    if(deckCard){
      deckCard.set('amount', deckCard.get('amount') + 1)
    }else{
      this.collection.add(new App.Models.DeckCard({
        card_id: card.id,
        name: card.get('name'),
        deck_id: this.collection.id,
      }))
    }
  },
  removeItem: function(view){
    var model = view.model
    model.set('amount', model.get('amount') - 1)
    if(model.get('amount') <= 0){
      this.collection.remove(view.model);
      this.removeItemView(view)
    }
  },
  saveChanges: function(model){
    if(model.get('amount') <= 0){
      model.destroy()
    }else{
      model.save()
    }
  },
  getPreview: function(card){
    this.trigger('preview', card)
  }
})
