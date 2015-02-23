var loaderObj = {

    templates : [
    'tmpl/modal.html'
]
};

loadTemplates(loaderObj.templates);
//This function loads all templates into the view
function loadTemplates(templates) {
    $(templates).each(function() {
        var tempObj = $('<script>');
        tempObj.attr('type', 'text/x-handlebars');
        var dataTemplateName = this.substring(0, this.indexOf('.'));
        tempObj.attr('data-template-name', dataTemplateName);
        $.ajax({
            async: false,
            type: 'GET',
            url: 'js/views/' + this,
            success: function(resp) {
                tempObj.html(resp);
                $('body').append(tempObj);                
            }
        });
    });

}


App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
	
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.ApplicationController = Ember.Controller.extend({
  // the initial value of the `search` property
  username: '',
  password: '',
  passwordVerify: '',
  logoUrl: '/img/tixzooLogo.png',
  navBarUrl: '/img/top_gray_navbar.png',
  tixzooLogoTriangle: '/img/tixzooLogoTriangle.png',
  backgroundHomePage: '/img/backgroundHomePage.png',
  blueBuy: '/img/blue_buy.png',
  orangeSell: '/img/orange_sell.png',
  greenBtnBuy: '/img/homeBuy.png',
  greenBtnSell: '/img/homeSell.png',
  navJoinZoo: '/img/join_the_zoo_bar.png',
  greenTriangle: '/img/green_triangle.png',
  orangeTriangle: '/img/orange_triangle.png',
  navTM: '/img/TixzooTmNav.png',
  blueBtnSignUp: '/img/SignUpBtn.png',
  blueBtnLogin: '/img/loginButton.png',
  actions: {
    query: function() {
      // the current value of the text field
      var query = this.get('search');
      this.transitionToRoute('search', { query: query });
    }
  }
});

/*
 * ApplicationRoute
 */
App.ApplicationRoute = Ember.Route.extend({
  actions: {
    showModal: function(name, model) {

      this.render(name, {
        into: 'application',
        outlet: 'modal',
        model: model
      });
    },
    removeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});

/*
 * IndexRoute
 */
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return Ember.Object.create({ username: 'My username'});
  }
});

/*
 * SignupModalController
 */
App.SignupModalController = Ember.ObjectController.extend({
  username: 'Enter Username',
  password: 'Enter Password',
  passwordVerify: 'Verify Password',
  email: 'example@example.com',
  validatePassword: function(){

    }.observes('password','passwordVerify'),
  actions: {
    save: function() {
      console.log(this.get('password'));

    } 
  }
});
/*
 * LoginModalController
 */
App.LoginModalController = Ember.ObjectController.extend({
  username: 'Enter Username',
  password: 'Enter Password',
  actions: {
    save: function() {
      console.log(this.get('password'));

    } 
  }
});

/*
 * LogoutModalController
 */
App.LogoutModalController = Ember.Controller.extend({
  actions: {
    logout: function() {
      alert('logout');
    }
  }
});

/*
 * MyModalComponent
 */
App.MyModalComponent = Ember.Component.extend({
  actions: {
    ok: function() {
      this.$('.modal').modal('hide');
      this.sendAction('ok');
    }
  },
  show: function() {
    this.$('.modal').modal().on('hidden.bs.modal', function() {
      this.sendAction('close');
    }.bind(this));
  }.on('didInsertElement')
});