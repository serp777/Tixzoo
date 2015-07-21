var loaderObj = {
    templates : [
    'tmpl/modal.html'
    ],
    css : [
    '../../css/bootstrap.css',
    '../../css/bootstrap.map.css',
    '../../css/buttons.css',
    '../../css/media_queries.css',
    '../../css/normalize.css',
    '../../css/search.css',
    '../../css/slideshow.css',
    '../../css/style.css',
    '../../css/stylesheet_nav.css',
    '../../css/ticket-feed.css'
  ]
};
loadTemplates(loaderObj.templates);
loadCss(loaderObj.css);
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
//This function loads all css into the html body
function loadCss(css) {
    $(css).each(function() {
        var tempObjCss = $('<style>');

        var dataTemplateNameCss = this.substring(0, this.indexOf('.'));
        $.ajax({
            async: false,
            type: 'GET',
            url: 'js/views/' + this,
            success: function(resp) {
                tempObjCss.html(resp);
                $('body').append(tempObjCss);
            }
        });
    });
}
App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});



App.ApplicationController = Ember.Controller.extend({
  // the initial value of the `search` property
  username: 'Enter Username',
  password: 'Enter Password',
  passwordVerify: 'Verify Password',
  email: 'example@example.com',
  loginSuccess: false,
  backgroundHomePageOne: 'img/backgroundHomePageOne.png',
  backgroundHomePageTwo: 'img/backgroundHomePageTwo.png',
  backgroundHomePageThree: 'img/backgroundHomePageThree.png',
  backgroundHomePageFour: 'img/backgroundHomePageFour.png',
  middleBackground: 'img/middle_bckimg.png',
  bottomBackground: 'img/tixzoo_land.png',
  tixzooLogo: 'img/tixzoo-logo.png',
  affordabilityIcon: 'img/affordability-icon.png',
  facebookIcon: 'img/fb.png',
  instagramIcon: 'img/instagram.png',
  lockIcon: 'img/lock-icon.png',
  peertopeerIcon: 'img/messaging-icon.png',
  snapchatIcon: 'img/',
  twitterIcon: 'img/twitter.png',
  maxFrat: 'img/max-frat.png',
  disclosurePhoto: 'img/disclosure-artist.png',


  pageUpdate: function(){
    console.log(this.get('username') + " : " + this.get('password'));
  }.observes('username','password'),
  actions: {
    query: function() {
      // the current value of the text field
      var query = this.get('search');
      this.transitionToRoute('search', { query: query });
    },
    logout: function() {
      this.set('loginSuccess', false);
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

