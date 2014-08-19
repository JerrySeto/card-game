App.Collections.CardSearchResults = Backbone.Collection.extend({
  url: '/cards/search',
  model: App.Models.Card,
  search: function(query){
    this.searching = true;
    this.trigger('search:searching')
    this.reset()
    return this.fetch({
      data:{
        query: query
      },
      reset: true,
    })
  }
})