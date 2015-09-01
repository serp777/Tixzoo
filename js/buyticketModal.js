/*
 * CreateTicketModalController
 */
App.BuyticketModalController = Ember.ObjectController.extend({
  needs: ['application'],
  maxFrat: 'img/max-frat.png',
  creditCard: 'buy-form-group',
  toggled: false,
  actions: {
  	creditCard: function() {
      if(this.get('creditCard') == 'buy-form-group'){
        this.set('toggled',true);
        this.set('creditCard','buy-form-group-toggled');
      } else {
        this.set('toggled',false);
        this.set('creditCard','buy-form-group');
      }
    }
  }
});
