App.TicketFeedController = Ember.ArrayController.extend({
  needs: ['application'],
  ticketJson: [],
  sortProperties: ['rating:desc', 'price:asc'],
  sortedTickets: Ember.computed.sort('ticketJson', 'sortProperties'),
  init: function() {
    this._super();
    this.set('ticketJson', this.get('controllers.application.ticketJson'));
   	
    if(!this.get('ticketJson') || this.get('ticketJson').length == 0)
    {
    	var that = this;
	    var message = null;
	    var xhr = $.ajax({
	        url: "Rest/mainController.php",
	        type: "GET",
	        dataType:'json',
	        data: {init: true},
	          success: function(data){
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
	        }).done(function() {
	          if (xhr.status != 200) { // error
	            message = { errorCode: xhr.status, errorMessage: xhr.statusText };
	          }
	            that.set('controllers.application.ticketJson',that.get('ticketJson'));
	            that.set('controllers.application.tempTicketJson',that.get('ticketJson'));
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
