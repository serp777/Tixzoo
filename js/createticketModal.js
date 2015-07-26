/*
 * CreateTicketModalController
 */
App.CreateticketModalController = Ember.ObjectController.extend({
  needs: ['application'],
  name: '',
  location: '',
  date: '',
  price: '',
  type: '',
  description: '',
  actions: {
    save: function() {
      var that = this;
      var message = null;
       var xhr = $.ajax({
          url: "Rest/mainController.php",
          type: "POST",
          dataType:'json',
          data: {name: this.get('name'), location: this.get('location'), date: this.get('date'), 
            price: this.get('price'), type: this.get('type'), description: this.get('description'), 
            username: this.get('controllers.application.username'), 
            password: this.get('controllers.application.password'), 
            createticketMode: "true"},
            success: function(data){
              console.log(data);
              if(data){
                
              }
            },
            error: function(error){
              //console.log(error);
            }
          });
          
        if (xhr.status != 200) { // error
            message = { errorCode: xhr.status, errorMessage: xhr.statusText };
        }

        return message;

    }
  }
});