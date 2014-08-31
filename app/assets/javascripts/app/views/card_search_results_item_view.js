App.Views.CardSearchResultItemView = Backbone.View.extend({
  className: 'search-result card-item',
  template: App.addTemplate('#card-search-item-view'),
  events: {
    'click div' : 'triggerClicked',
    'click .add-btn' : 'triggerAdd'
  },
  render: function(){
    this.$el.append(this.template(this.model.toJSON()))
    return this.el
  },
  triggerClicked: function(){
    this.model.trigger('search:selected', this.model)
    this.setActive(true)
  },
  setActive: function(active){
    this.$el.toggleClass('active', active)
  },
  triggerAdd: function(){
    Backbone.trigger('search:add', this.model)
  }
})
