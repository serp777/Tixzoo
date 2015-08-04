App.TicketFeedController = Ember.ArrayController.extend({
  needs: ['application'],
  ticketJson: [],
  sortProperties: ['rating:desc', 'price:asc'],
  sortedTickets: Ember.computed.sort('ticketJson', 'sortProperties'),
  init: function() {
    this._super();
    console.log("testtesttest");
  },
  actions: {
  	sortBy: function(sortProperties) {
      this.set('ticketJson', this.get('controllers.application.ticketJson'));
      this.set('sortProperties', [sortProperties]);
      console.log("testsortBy");
  	},
    echo: function(){
      console.log("testecho");
    }
  }
});
