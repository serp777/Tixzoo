/*
 * CreateTicketModalController
 */
App.BuyticketModalController = Ember.Controller.extend({
  needs: ['application'],
  maxFrat: 'img/max-frat.png',
  creditCard: 'buy-form-group',
  toggled: false,
  fullname: "",
  creditCardNumber: "",
  CVC: "",
  expDate: "",
  actions: {
    creditCardOutput: function() {
      var that = this;
      Stripe.setPublishableKey('pk_test_1x7cbrNQ0PCFEzY401EoxG8M');
      Stripe.card.createToken({
        number: this.get('creditCardNumber'),
        cvc: this.get('CVC'),
        exp_month: this.get('expDate').split('/')["0"],
        exp_year: this.get('expDate').split('/')["1"]
      }, function(status, response){
          that.get('controllers.application').sendCreditCardInfo("test",response).success(function (data) {
            console.log("success");
        });
      });
    },
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
