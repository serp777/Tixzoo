App.TicketsController = Ember.ArrayController.extend({
  needs: ['application'],
  sortProperties: ['rating:desc', 'price:asc'],
  sortedTickets: function() {
      return Ember.computed.sort(this.get('controllers.application.ticketJson'), 'sortProperties')
    },
  sortBy: function(sortProperties) {
      this.set('sortProperties', [sortProperties]);
      return sortedTickets;
  }
});
