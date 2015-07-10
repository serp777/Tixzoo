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
  email: '',
  logoUrl: 'http://www.pacifictrans.org/test/tixzoo/img/tixzooLogo.png',
  navBarUrl: 'http://www.pacifictrans.org/test/tixzoo/img/top_gray_navbar.png',
  tixzooLogoTriangle: 'http://www.pacifictrans.org/test/tixzoo/img/tixzooLogoTriangle.png',
  backgroundHomePage: 'http://www.pacifictrans.org/test/tixzoo/img/backgroundHomePage.png',
  backgroundHomePageTwo: 'http://www.pacifictrans.org/test/tixzoo/img/backgroundHomePageTwo.jpg',
  backgroundHomePageThree: 'http://www.pacifictrans.org/test/tixzoo/img/backgroundHomePageThree.jpg',
  backgroundHomePageFour: 'http://www.pacifictrans.org/test/tixzoo/img/backgroundHomePageFour.jpg',
  backgroundHomePageFive: 'http://www.pacifictrans.org/test/tixzoo/img/backgroundHomePageFive.jpg',
  backgroundHomePageSix: 'http://www.pacifictrans.org/test/tixzoo/img/backgroundHomePageSix.jpg',
  backgroundHomePageSeven: 'http://www.pacifictrans.org/test/tixzoo/img/backgroundHomePageSeven.jpg',
  blueBuy: 'http://www.pacifictrans.org/test/tixzoo/img/blue_buy.png',
  orangeSell: 'http://www.pacifictrans.org/test/tixzoo/img/orange_sell.png',
  greenBtnBuy: 'http://www.pacifictrans.org/test/tixzoo/img/homeBuy.png',
  greenBtnSell: 'http://www.pacifictrans.org/test/tixzoo/img/homeSell.png',
  navJoinZoo: 'http://www.pacifictrans.org/test/tixzoo/img/join_the_zoo_bar.png',
  greenTriangle: 'http://www.pacifictrans.org/test/tixzoo/img/green_triangle.png',
  orangeTriangle: 'http://www.pacifictrans.org/test/tixzoo/img/orange_triangle.png',
  navTM: 'http://www.pacifictrans.org/test/tixzoo/img/TixzooTmNav.png',
  blueBtnSignUp: 'http://www.pacifictrans.org/test/tixzoo/img/SignUpBtn.png',
  blueBtnLogin: 'http://www.pacifictrans.org/test/tixzoo/img/loginButton.png',
  actions: {
    query: function() {
      // the current value of the text field
      var query = this.get('search');
      this.transitionToRoute('search', { query: query });
    },
    sendEmail: function() {
      var message = null;
       var xhr = $.ajax({
          url: "Rest/email.php",
          type: "POST",
          dataType:'json',
          data: {email: this.get('email')},
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
 * Log
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