Backbone.View.prototype.close = function(){
  if(this.onClose){
    this.onClose()
  }
  this.remove()
}


App.Routers.CardRouter = Backbone.Router.extend({
  routes: {
    '': 'root'
  },
  initialize: function(){
    this.deck  = new App.Collections.Deck([], {id: bootstrapped.deckId})
    this.deckView = new App.Views.DeckListView({
      collection: this.deck
    })

    this.searchResults = new App.Collections.CardSearchResults()

    this.search = new App.Views.CardSearchView({
      collection: this.searchResults
    })

    this.searchResultsView = new App.Views.CardSearchResultsListView({
      collection: this.searchResults
    });

    $('#search')
      .append(this.search.render())
      .append(this.searchResultsView.render())

    $('#deck-list').append(this.deckView.render())

    this.deck.fetch({
      reset: true
    });

    this.listenTo(this.searchResults, 'search:selected', this.showPreview)
    this.listenTo(this.searchResults, 'search:searching', this.clearPreview)
    this.listenTo(this.deckView, 'preview', this.showPreview)
  },
  root: function(){

  },
  showPreview: function(model){
    if(this.preview && this.preview.model.id === model.id){
      return
    }
    this.clearPreview()
    this.preview = new App.Views.CardView({
      model: model
    })
    var self = this
    model.fetch().done(function(){
      $('#preview').append(self.preview.render())
    })
  },
  clearPreview: function(){
    if(this.preview){
      this.preview.close()
      this.preview = null
    }
  }
})

$(function(){
  router = new App.Routers.CardRouter()
  Backbone.history.start();
})
