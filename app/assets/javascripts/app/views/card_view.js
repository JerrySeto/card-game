App.Views.CardView = Backbone.View.extend({
  template: App.addTemplate('#card-view'),
  render: function(){
    this.$el.empty()
    var model = this.model.clone()
    var attrs = model.attributes

    attrs.cost = model.get('cost').match(/wi|wa|ea|et|\d|fi/ig)
    this.$el.append(this.template(attrs))
    return this.el
  },
})