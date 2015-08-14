App.TicketFeedController = Ember.ArrayController.extend({
  needs: ['application'],
  disclosurePhoto: 'img/disclosure-artist.png',
  maxFrat: 'img/max-frat.png',
  facebookIcon: 'img/fb.png',
  instagramIcon: 'img/instagram.png',
  twitterIcon: 'img/twitter.png',
  ticketJson: [],
  sortProperties: ['rating:desc', 'price:asc'],
  sortedTickets: Ember.computed.sort('ticketJson', 'sortProperties'),
  init: function() {
    this._super();
    this.set('ticketJson', this.get('controllers.application.ticketJson'));
    if(!this.get('ticketJson') || this.get('ticketJson').length == 0)
    {
	  var that = this;
      this.get('controllers.application').getTicketAjax().success(function (data) {
      that.set('ticketJson', data["tickets"]);
      that.set('tempTicketJson', data["tickets"]);
    });
    }
  },
  actions: {
  	sortBy: function(sortProperties) {
      this.set('sortProperties', [sortProperties]);
  	},
    echo: function(){
      console.log("testecho");
    }
  }
});
