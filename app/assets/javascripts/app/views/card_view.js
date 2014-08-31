App.Views.CardView = Backbone.View.extend({
  template: App.addTemplate('#card-view'),
  render: function(){
    this.$el.empty()
    var model = this.model.clone()
    var attrs = model.attributes
    var cost = [{symbol:model.get('cost').replace(/[^\d]/g, '')}]
    var coloredMana = model.get('cost').replace(/\d/g, '').split('')
    for(var i=0, l=coloredMana.length; i<l; i++){
      cost.push({symbol: coloredMana[i]})
    }
    attrs.cost = cost
    this.$el.append(this.template(attrs))
    return this.el
  },
})