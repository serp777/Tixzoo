App.MainPageController = Ember.ObjectController.extend({
  username: 'Enter Username',
  password: 'Enter Password',
  passwordVerify: 'Verify Password',
  email: 'example@example.com',
  loginSuccess: false,
  backgroundHomePageOne: '/img/backgroundHomePageOne.png',
  backgroundHomePageTwo: '/img/backgroundHomePageTwo.png',
  backgroundHomePageThree: '/img/backgroundHomePageThree.png',
  backgroundHomePageFour: '/img/backgroundHomePageFour.png',
  middleBackground: '/img/middle_bckimg.png',
  bottomBackground: '/img/tixzoo_land.png',
  tixzooLogo: '/img/tixzoo-logo.png',
  affordabilityIcon: '/img/affordability-icon.png',
  facebookIcon: '/img/fb.png',
  instagramIcon: '/img/instagram.png',
  lockIcon: '/img/lock-icon.png',
  peertopeerIcon: '/img/messaging-icon.png',
  snapchatIcon: '/img/',
  twitterIcon: '/img/twitter.png',
  maxFrat: '/img/max-frat.png',
  disclosurePhoto: '/img/disclosure-artist.png',
  ticketEn: false,
  ticketJson: [],
  tempTicketJson: [],
  searchText: '',
    init: function() {
    this._super();
    var that = this;
    var message = null;
    var xhr = $.ajax({
        url: "Rest/mainController.php",
        type: "GET",
        dataType:'json',
        data: {init: true},
          success: function(data){
            console.log(data);
              that.set('ticketJson',data["tickets"]);
              that.set('tempTicketJson',data["tickets"]);
              that.set('ticketEn',true);
            if(data["cookie"]){
              that.set('username',data["cookie"]["user"]["username"]);
              that.set('password',data["cookie"]["user"]["password"]);
              that.set('loginSuccess',true);
            }
          },
        error: function(data){
          console.log(data);
        }
        });

      if (xhr.status != 200) { // error
          message = { errorCode: xhr.status, errorMessage: xhr.statusText };
      }
      return message;
  },
  modifiedContent: function(){

      var that = this;
      var search = this.get('searchText');
      var tickets = this.get('ticketJson');

      
      if (!this.get('ticketEn') || !search || search == '') { 
        this.set('tempTicketJson',tickets);
        return tickets; 
      }
              var message = null;
              var xhr = $.ajax({
                  url: "Rest/similarity.php",
                  type: "GET",
                  dataType:'json',
                  data: {search: search, list: tickets},
                    success: function(data){
                      console.log(data);
                      if(data && data !== null){
                        that.set('tempTicketJson',data["tickets"]);
                      } else {
                        that.set('tempTicketJson',[]);
                      }
                    }
                  });
              //return "";
    }.observes('searchText','ticketEn'),
    ticketFeed: function() {
      console.log(this.get('tempTicketJson'));
      return this.get('tempTicketJson');
    }.property('tempTicketJson','searchText'),
    actions: {
    logout: function() {
      this.set('loginSuccess', false);
        var that = this;
        var message = null;
        var xhr = $.ajax({
          url: "Rest/mainController.php",
          type: "GET",
          dataType:'json',
          data: {logoutMode: "true"},
            success: function(data){
                that.set('controllers.application.loginSuccess',false);
            },
            error: function(error){
              console.log("why");
              console.log(error);
            }
          });

        if (xhr.status != 200) { // error
            message = { errorCode: xhr.status, errorMessage: xhr.statusText };
        }
        return message;

    }
    }
});