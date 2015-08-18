App.SignupModalController = Ember.ObjectController.extend({
  username: '',
  usernameText: 'Enter Username',
  password: '',
  passwordText: 'Enter Password',
  passwordVerify: '',
  passwordVerifyText: 'Verify Password',
  email: '',
  emailText: 'example@example.com',
  signupModal: '/img/background_modal.png',
  existsAlready: false,
  errorMessage: "No errors",
  actions: {
    save: function() {
      var that = this;
      var message = null;
       var xhr = $.ajax({
          url: "Rest/mainController.php",
          type: "POST",
          dataType:'json',
          data: {username: this.get('username'), password: this.get('password'), email: this.get('email'), createMode: "true"},
            success: function(data){

              if(data["dataError"]){
                that.set('errorMessage', data["dataError"]);
                that.set('existsAlready',true);
                console.log("failed");
              } else {
                $('.modal').modal('hide');
              } 
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
