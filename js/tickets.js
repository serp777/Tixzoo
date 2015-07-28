/*
 * TicketsController
 */
App.TicketsController = Ember.ArrayController.extend({
  actions: {
    sort: function(property) {
      if (this.get('isSorted') && (this.get('sortProperties')[0] === property)) {
        this.toggleProperty('sortAscending');
      } else {
        this.set('sortProperties', [property]);
        this.set('sortAscending', true);
      }
    }
  }
 });
