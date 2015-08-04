App.SignupModalController = Ember.ObjectController.extend({
  username: '',
  usernameText: 'Enter Username',
  password: '',
  passwordText: 'Enter Password',
  passwordVerify: '',
  passwordVerifyText: 'Verify Password',
  email: '',
  emailText: 'example@example.com',
  signupModal: 'img/background_modal.png',
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
