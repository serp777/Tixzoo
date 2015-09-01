/*
 * LoginModalController
 */
App.LoginModalController = Ember.ObjectController.extend({
  needs: ['application'],
  username: '',
  usernameText: 'Enter Username',
  password: '',
  passwordText: 'Enter Password',
  actions: {
    save: function() {
      var that = this;
      var message = null;
       var xhr = $.ajax({
          url: "Rest/mainController.php",
          type: "POST",
          dataType:'json',
          data: {username: this.get('username'), password: this.get('password'), loginMode: "true"},
            success: function(data){
              if(data["loginVal"] > 0){
                that.set('controllers.application.username',that.get('username'));
                that.set('controllers.application.password',that.get('password'));
                that.set('controllers.application.loginSuccess',true);
                console.log(that.get('controllers.application.loginSuccess'));
              }
            },
            error: function(error){
              console.log("error occured");
              console.log(error);
            }
          });

        if (xhr.status != 200) { // error
            message = { errorCode: xhr.status, errorMessage: xhr.statusText };
        }

        return message;

    }
  }
});