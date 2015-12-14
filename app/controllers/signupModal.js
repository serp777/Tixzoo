App.SignupModalController = Ember.Controller.extend({
  password: '',
  passwordText: 'Enter Password',
  passwordVerify: '',
  passwordVerifyText: 'Verify Password',
  email: '',
  emailText: 'example@example.com',
  signupModal: 'public/img/background_modal.png',
  existsAlready: false,
  errorMessage: "No errors",
  spinner: false,
  actions: {
    save: function() {
      var that = this;
      var message = null;
       var xhr = $.ajax({
          url: "Rest/mainController.php",
          type: "POST",
          dataType:'json',
          data: {email: this.get('email'), password: this.get('password'), createMode: "true"},
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
