/*
 * LoginModalController
 */
App.LoginModalController = Ember.ObjectController.extend({
  username: 'Enter Username',
  password: 'Enter Password',
  actions: {
    save: function() {
      var message = null;
       var xhr = $.ajax({
          url: "Rest/mainController.php",
          type: "POST",
          dataType:'json',
          data: {username: this.get('username'), password: this.get('password'), loginMode: "true"},
            success: function(data){
              console.log(data);
            }
          });
          console.log(xhr);
        if (xhr.status != 200) { // error
            message = { errorCode: xhr.status, errorMessage: xhr.statusText };
        }

        return message;

    }
  }
});