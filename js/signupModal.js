App.SignupModalController = Ember.ObjectController.extend({
  username: 'Enter Username',
  password: 'Enter Password',
  passwordVerify: 'Verify Password',
  email: 'example@example.com',
  actions: {
    save: function() {
      var message = null;
       var xhr = $.ajax({
          url: "Rest/mainController.php",
          type: "POST",
          dataType:'json',
          data: {username: this.get('username'), password: this.get('password'), email: this.get('email'), createMode: "true"},
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
