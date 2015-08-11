App.TicketFeedController = Ember.ArrayController.extend({
  needs: ['application'],
  ticketJson: [],
  sortProperties: ['rating:desc', 'price:asc'],
  sortedTickets: Ember.computed.sort('ticketJson', 'sortProperties'),
  init: function() {
    this._super();
    this.set('ticketJson', this.get('controllers.application.ticketJson'));
  }.observes("controllers.application.ticketJson"),
  actions: {
  	sortBy: function(sortProperties) {
      this.set('sortProperties', [sortProperties]);
      //console.log("testsortBy");
  	},
    echo: function(){
      console.log("testecho");
    }
  }
});
