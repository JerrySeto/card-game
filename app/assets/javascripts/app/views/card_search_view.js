App.Views.CardSearchView = Backbone.View.extend({
  template: App.addTemplate('#card-search-view'),
  events: {
    "submit form" : 'search',
  },
  initialize: function(){
  },
  render: function(){
    this.$el.append(this.template())
    this.queryInput = this.$("input[name='query']");
    return this.el
  },
  search: function(event){
    var self = this;
    var query = this.queryInput.val()
    event.preventDefault();

    if(!this.searching && query !== ''){
      self.searching = true;
      this.collection.search(query).then(function(){
        self.searching = false;
        self.queryInput.prop('disabled', false)
      })
      this.queryInput.prop('disabled', true)
      this.queryInput.val('')
    }
  }
})