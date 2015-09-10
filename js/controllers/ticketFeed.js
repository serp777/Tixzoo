App.TicketFeedController = Ember.Controller.extend({
  needs: ['application'],
  loginSuccess: false,
  email: '',
  password: '',
  disclosurePhoto: 'img/disclosure-artist.png',
  maxFrat: 'img/max-frat.png',
  facebookIcon: 'img/fb.png',
  instagramIcon: 'img/instagram.png',
  twitterIcon: 'img/twitter.png',
  ticketJson: [],
  sortProperties: ['rating:desc', 'price:asc'],
  sortedTickets: Ember.computed.sort('ticketJson', 'sortProperties'),
  searchText: '',
  init: function() {
    this._super();
    if(!this.get('loginSuccess')){
      this.get('controllers.application').getCookies().success(function (data){
        if(data.cookie.email && data.cookie !== "noCookie"){
          that.set('controllers.application.loginSuccess',true);
          that.set('controllers.application.email',data.cookie.email.email);
        }
      });
    }
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
  updateLogin: function(){
    this.set('loginSuccess',this.get('controllers.application.loginSuccess'));
    this.set('email',this.get('controllers.application.email'));
    this.set('password',this.get('controllers.application.password')); 
  }.observes('controllers.application.loginSuccess'),
  actions: {
  	sortBy: function(sortProperties) {
      this.set('sortProperties', [sortProperties]);
  	},
    echo: function(){
      console.log("testecho");
    }
  }
});
