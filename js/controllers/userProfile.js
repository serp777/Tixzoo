App.UserProfileController = Ember.Controller.extend({
	needs: ['application'],
  	twitterIcon: 'img/twitter.png',
  	facebookIcon: 'img/fb.png',
  	instagramIcon: 'img/instagram.png',
  	tixzooLogo: 'img/tixzoo-logo.png',
  	password: '',
  	email: '',
  	loginSuccess: false,
  	userTicketsBuy: [],
  	userTicketsSell: [],
	init: function() {
	    this._super();
	    var that = this;
	    console.log("test");
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
});