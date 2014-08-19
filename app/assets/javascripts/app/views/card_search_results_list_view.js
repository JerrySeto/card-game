App.Views.CardSearchResultsListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'reset', this.render)
    this.listenTo(this.collection, 'search:selected', this.deselectAll)
    this.listenTo(this.collection, 'search:searching', this.clearItemViews)
    this.itemViews = [];
  },
  render: function(){
    var self = this;
    var docFrag = document.createDocumentFragment()
    this.clearItemViews()
    this.collection.each(function(model){
      var newItem = new App.Views.CardSearchResultItemView({
        model: model
      })
      self.itemViews.push(newItem)
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
  deselectAll: function(){
    this.$('.search-result.active').removeClass('active')
  }
})