App.PostTicketController = Ember.Controller.extend({
  needs: ['application'],

  init: function() {
  this.set('controllers.application.creditCardModalToggled',true);
  }


});