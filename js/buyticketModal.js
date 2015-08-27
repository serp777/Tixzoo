/*
 * CreateTicketModalController
 */
App.BuyticketModalController = Ember.ObjectController.extend({
  needs: ['application'],
  maxFrat: 'img/max-frat.png',
  creditCard: 'view-ticket-info',
  actions: {
  	creditCard: function() {
      console.log('test');
      if(this.get('creditCard') == 'view-ticket-info'){
        this.set('creditCard','view-ticket-info-affect');
      } else {
        this.set('creditCard','view-ticket-info');
      }
    }, 
  temp: function() {

  }
  }
});
