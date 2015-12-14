/*
 * ApplicationRoute
 */
App.ApplicationRoute = Ember.Route.extend({
  actions: {
    showModal: function(name, model) {
        this.render(name, {
          into: 'application',
          outlet: 'modal',
          model: model
        });
    },
    removeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});