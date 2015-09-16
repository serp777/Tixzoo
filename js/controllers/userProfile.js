App.UserProfileController = Ember.Controller.extend({
	needs: ['application'],
  twitterIcon: 'img/twitter.png',
  facebookIcon: 'img/fb.png',
  instagramIcon: 'img/instagram.png',
  tixzooLogo: 'img/tixzoo-logo.png',
  maxFrat: 'img/max-frat.png',
  password: '',
  email: '',
  loginSuccess: false,
  firstName: '',
  lastName: '',
  userTicketsBuy: [],
  userTicketsSell: [],
	init: function() {
	    this._super();
	    var that = this;
	    if(!this.get('loginSuccess')){ 
	      this.get('controllers.application').getCookies().success(function (data){
	        if(data.cookie.email && data.cookie !== "noCookie"){
	        	that.set('controllers.application.loginSuccess',true);
	          that.set('controllers.application.email',data.cookie.email.email);
	          that.set('email',data.cookie.email.email);
	          that.set('password',data.cookie.email.password);
            that.set('loginSuccess', true);
	          console.log(that.get('email'));
	          console.log(that.get('password'));
	        }
        });
      }
      if (this.get('loginSuccess')){
        this.getUserInfo();
      }
	    this.get('controllers.application').getTicketAjax().success(function (data) {
	      	that.set('ticketJson', data["tickets"]);
	      	that.set('tempTicketJson', data["tickets"]);
	      	that.set('controllers.application.ticketJson', data["tickets"]);
	      	that.set('controllers.application.tempTicketJson', data["tickets"]);
	      	that.set('ticketEn',true);
	    });
	  },
  getUserInfo: function() {
    var that = this;
    setTimeout(function(){
          var xhr = $.ajax({
            url: "Rest/mainController.php",
            type: "POST",
            dataType:'json',
            data: {email: that.get('email'), password: that.get('password'), getUserInfo: "true"},
              success: function(data){
                console.log(data);
                if(data["error"] == false){
                  that.set('firstName', data["first_name"]);
                  that.set('lastName', data["last_name"]);
                  that.set('userTicketsSell', data["selling"]);
                } 
              },
              error: function(error){
                console.log(error);
              }
            });

          if (xhr.status != 200) { // error
              //message = { errorCode: xhr.status, errorMessage: xhr.statusText };
          }
          // return message;
        }, 1000);
  },
	updateLogin: function(){
      console.log(this.get('controllers.application.loginSuccess'));
	    this.set('loginSuccess',this.get('controllers.application.loginSuccess'));
	    this.set('email',this.get('controllers.application.email'));
	    this.set('password',this.get('controllers.application.password')); 
      if (!this.get('controllers.application.loginSuccess')) {
        this.set('firstName', '');
        this.set('lastName', '');
      } else {
        this.getUserInfo();
      }
	 }.observes('controllers.application.loginSuccess'),
});