/*
 * CreateTicketModalController
 */
App.CreateticketModalController = Ember.ObjectController.extend({
  actions: {
    save: function() {
      var that = this;
      var message = null;
       var xhr = $.ajax({
          url: "Rest/mainController.php",
          type: "POST",
          dataType:'json',
          data: { createTicketMode: "true"},
            success: function(data){
              console.log(data);
              if(data){
          
              }
            }
          });
          
        if (xhr.status != 200) { // error
            message = { errorCode: xhr.status, errorMessage: xhr.statusText };
        }

        return message;

    }
  }
});