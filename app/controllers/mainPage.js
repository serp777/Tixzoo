App.MainPageController = Ember.Controller.extend({
  needs: ['application'],
  creditCard: '',
  password: '',
  passwordVerify: '',
  email: '',
  loginSuccess: false,
  backgroundHomePageOne: 'public/img/backgroundHomePageOne.png',
  backgroundHomePageTwo: 'public/img/backgroundHomePageTwo.png',
  backgroundHomePageThree: 'public/img/backgroundHomePageThree.png',
  backgroundHomePageFour: 'public/img/backgroundHomePageFour.png',
  backgroundHomePageFive: 'public/img/backgroundHomePageFive.png',
  backgroundHomePageSix: 'public/img/backgroundHomePageSix.png',
  middleBackground: 'public/img/middle_bckimg.png',
  bottomBackground: 'public/img/tixzoo_land.png',
  tixzooLogo: 'public/img/tixzoo-logo.png',
  affordabilityIcon: 'public/img/affordability-icon.png',
  facebookIcon: 'public/img/fb.png',
  instagramIcon: 'public/img/instagram.png',
  lockIcon: 'public/img/lock-icon.png',
  peertopeerIcon: 'public/img/messaging-icon.png',
  snapchatIcon: 'public/img/',
  twitterIcon: 'public/img/twitter.png',
  maxFrat: 'public/img/max-frat.png',
  disclosurePhoto: 'public/img/disclosure-artist.png',
  secondmodel: true,
  ticketEn: false,
  ticketJson: [],
  tempTicketJson: [],
  searchText: '',
  init: function() {
    this._super();
    var that = this;
    if(!this.get('loginSuccess')){
      this.get('controllers.application').getCookies().success(function (data){
        if(data.cookie.email && data.cookie !== "noCookie"){
          that.set('controllers.application.loginSuccess',true);
          that.set('controllers.application.email',data.cookie.email.email);
        }
      });
    }
    this.get('controllers.application').getTicketAjax().success(function (data) {
      that.set('ticketJson', data["tickets"]);
      that.set('tempTicketJson', data["tickets"]);
      that.set('controllers.application.ticketJson', data["tickets"]);
      that.set('controllers.application.tempTicketJson', data["tickets"]);
      that.set('ticketEn',true);
    });
  },
  updateLogin: function(){
    this.set('loginSuccess',this.get('controllers.application.loginSuccess'));
    this.set('email',this.get('controllers.application.email'));
    this.set('password',this.get('controllers.application.password'));
  }.observes('controllers.application.loginSuccess'),
  modifiedContent: function(){
      var that = this;
      var search = this.get('searchText');
      var tickets = this.get('ticketJson');
      if (!this.get('ticketEn') || !search || search == '') {
        this.set('tempTicketJson',tickets.slice().splice(0,5));
        return tickets;
      }
      var that = this;
      this.get('controllers.application').similarText(search,tickets).success(function (data) {
        if(data && data !== null){
          that.set('tempTicketJson',data["tickets"].slice().splice(0,5));
        } else {
          that.set('tempTicketJson',[]);
        }
      });
    }.observes('searchText','ticketEn'),
  actions: {
    tempAction: function() {

    }
  }
});