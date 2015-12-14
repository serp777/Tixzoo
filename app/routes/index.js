/*
 * IndexRoute
 */
App.IndexRoute = Ember.Route.extend({

  model: function() {
    return Ember.Object.create({ email: 'My email'});
  }
});