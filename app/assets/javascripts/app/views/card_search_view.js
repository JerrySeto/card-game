App.Views.CardSearchView = Backbone.View.extend({
  template: App.addTemplate('#card-search-view'),
  events: {
    "submit form" : 'search',
    "click .quick-search-toggle" : 'toggleQuickSearch',
    "click .quick-search-filters li" : "colorSearch"
  },
  initialize: function(){
  },
  render: function(){
    this.$el.append(this.template())
    this.queryInput = this.$("input[name='query']");
    this.quickSearchButtons = this.$('.quick-search-wrap ul')
    return this.el
  },
  search: function(event){
    var self = this;
    var query = this.queryInput.val()
    event.preventDefault();

    if(!this.searching && query !== ''){
      this.searching = true;
      this.collection.search(query).then(function(){
        self.searching = false;
        self.queryInput.prop('disabled', false)
      })
      this.queryInput.prop('disabled', true)
      this.queryInput.val('')
    }
  },
  toggleQuickSearch: function(){
    var self = this;
    this.$('form').slideToggle()
    this.quickSearchButtons.slideToggle({
      done:function(){
        self.$('.quick-search-toggle').text(self.quickSearchButtons.is(':visible') ? 'Quick Search↰' : 'Quick Search↴')
      }
    })
  },
  colorSearch: function(event){
    var self = this;
    var color = $(event.currentTarget).attr('data-color')
    event.preventDefault();

    if(!this.searching){
      this.searching = true;
      this.collection.fetch({
        data: {
          "card[color]": color
        },
        reset: true
      }).then(function(){
        self.searching = false;
        self.queryInput.prop('disabled', false)
      })
      this.queryInput.prop('disabled', true)
      this.queryInput.val('')
    }
  }
})