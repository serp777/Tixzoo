/*
 * LoginModalController
 */
App.LoginModalController = Ember.ObjectController.extend({
  needs: ['application'],
  username: '',
  usernameText: 'Enter Username',
  password: '',
  passwordText: 'Enter Password',
  errorMessage: 'This is a glitch if this shows up',
  spinnerImg: 'img/spinner.GIF',
  signInError: false,
  spinner: false,
  actions: {
    save: function() {
      this.set('spinner', true);
      this.set('signInError', false);
      var that = this;
      var message = null;
      setTimeout(function(){
         var xhr = $.ajax({
            url: "Rest/mainController.php",
            type: "POST",
            dataType:'json',
            data: {username: that.get('username'), password: that.get('password'), loginMode: "true"},
              success: function(data){
                if(data["loginVal"] > 0 && data["error"] == false){
                  that.set('controllers.application.username',that.get('username'));
                  that.set('controllers.application.password',that.get('password'));
                  that.set('controllers.application.loginSuccess',true);
                  $('.modal').modal('hide');
                } 
                if(data["error"]){
                  that.set('errorMessage',data["errorMessage"]);
                  that.set('signInError',true);
                }
                that.set('spinner', false);
              },
              error: function(error){
                console.log(error);
              }
            });

          if (xhr.status != 200) { // error
              message = { errorCode: xhr.status, errorMessage: xhr.statusText };
          }

          return message;
        }, 1000);
    }
  }
});