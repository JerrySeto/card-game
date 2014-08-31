App.Views.CardSearchView = Backbone.View.extend({
  template: App.addTemplate('#card-search-view'),
  events: {
    "submit form" : 'search',
    "keypress input[name='query']" : 'updateQuery'
  },
  initialize: function(){
    this.query = ''
  },
  render: function(){
    this.$el.append(this.template())
    this.queryInput = this.$("input[name='query']");
    return this.el
  },
  search: function(event){
    var self = this;
    event.preventDefault();
    if(!this.searching && this.query !== ''){
      self.searching = true;
      this.collection.search(this.query).then(function(){
        self.searching = false;
        self.queryInput.prop('disabled', false)
      })
      this.query = ''
      this.queryInput.prop('disabled', true)
      this.queryInput.val('')
    }

  },
  updateQuery:function(event){
    this.query = $(event.currentTarget).val()
  }
})