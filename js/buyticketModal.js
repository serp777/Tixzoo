/*
 * CreateTicketModalController
 */
App.BuyticketModalController = Ember.ObjectController.extend({
  needs: ['application'],
  maxFrat: 'img/max-frat.png',
  creditCard: 'view-ticket-info',
  toggled: false,
  actions: {
  	creditCard: function() {
      console.log('test');
      if(this.get('creditCard') == 'view-ticket-info'){
        this.set('toggled',true);
        this.set('creditCard','view-ticket-info-affect');
      } else {
        this.set('toggled',false);
        this.set('creditCard','view-ticket-info');
      }
    }, 
  temp: function() {

  }
  }
});
