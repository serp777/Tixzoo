App.SignupModalController = Ember.ObjectController.extend({
  needs: ['application'],
  username: '',
  usernameText: 'Enter Username',
  password: '',
  passwordVerify: '',
  passwordText: 'Enter Password',
  email: '',
  emailText: 'example@example.com',
  actions: {
    save: function() { 
      var message = null;
       var xhr = $.ajax({
          url: "Rest/mainController.php",
          type: "POST",
          dataType:'json',
          data: {username: this.get('username'), password: this.get('password'), email: this.get('email'), createMode: "true"},
            success: function(data){
              console.log(data["response"]);
            },
            error: function(error){

            }
          });

        if (xhr.status != 200) { // error
            message = { errorCode: xhr.status, errorMessage: xhr.statusText };
        }

        return message;

    }
  }
});
