var loaderObj = {
    templates : [
    'modal.html',
    'ticketfeed.html',
    'mainpage.html',
    'postticket.html',
    'userprofile.html',
    'viewticket.html',
    'confirmticket.html',
    'customersupport.html'
    ],
    css : [
    'bootstrap.css',
    'simple-sidebar.css',
    'pickaday.css',
    'buttons.css',
    'media_queries.css',
    'normalize.css',
    'search.css',
    'slideshow.css',
    'style.css',
    'ticket-feed.css',
    'to-post-ticket.css',
    'user-profile.css',
    'view-ticket.css',
    'customer-support.css'
  ]
};


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
            url: 'js/views/tmpl/' + this,
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
            url: 'css/' + this,
            success: function(resp) {
                tempObjCss.html(resp);
                $('body').append(tempObjCss);
            }
        });
    });
}

        


loadCss(loaderObj.css);
loadTemplates(loaderObj.templates);



App = Ember.Application.create();
App.Router.map(function() {
  this.resource("ticket-feed", function(){
    this.route("buy", { path: "/:ticketID" });
  });
  this.resource("main-page", function(){
    this.route("load", { path: "/" });
  });
  this.resource("post-ticket", function(){
    this.route("load", { path: "/" });
  });
  this.resource("confirm-ticket", function(){
    this.route("load", { path: "/" });
  });
  this.resource("user-profile", function(){
    this.route("load", { path: "/" });
  });
  this.resource("view-ticket", function(){
    this.route("load", { path: "/" });
  });
  this.resource("customer-support", function(){
    this.route("load", { path: "/" });
  });
});



App.ApplicationController = Ember.Controller.extend({
  email: '',
  password: '',
  loginSuccess: false,
  creditCardModalToggled: false,
  wrapper: 'wrapper',
  wrapperClass: 'toggled',
  artist: '',
  artistText: 'Artist | Event',
  venue: '',
  venueText: 'Venue',
  date: '',
  dateVal: '',
  dateText: 'Date',
  tixzooLogo: 'img/tixzoo-logo.png',
  quantity: '',
  quantityText: 'Quantity',
  price: '',
  searchMag: 'img/searchbar1.png',
  route: 'main-page',
  ticketJson: [],
  tempTicketJson: [],
  facebookIcon: 'img/fb.png',
  instagramIcon: 'img/instagram.png',
  lockIcon: 'img/lock-icon.png',
  peertopeerIcon: 'img/messaging-icon.png',
  snapchatIcon: 'img/',
  twitterIcon: 'img/twitter.png',
  init: function() {
    this._super();
    var url = window.location.href.split("/");
    if(url[3] === null || url[3] === "" || url[4] === null || url[4] === ""){
      this.transitionToRoute(this.get('route'));
    }

  },
  sendCreditCardInfo: function(email, response) {
      return $.ajax({
          url: "Rest/stripeController.php",
          type: "POST",
          dataType:'json',
          data: {email: email, response: response},
          error: function(data){
            console.log(data);
          }
      });
  },
  getTicketAjax: function() {
      return $.ajax({
          url: "Rest/mainController.php",
          type: "GET",
          dataType:'json',
          data: {init: true},
          error: function(data){
            console.log(data);
          }
      });
  },
  similarText: function(search, tickets) {
      return $.ajax({
          url: "Rest/similarity.php",
          type: "GET",
          dataType:'json',
          data: {search: search, list: tickets},
          error: function(data){
            console.log(data);
          }
      });
  },
    actions: {
    dateActivate: function() {
      $("#datepicker").datepicker();
    },
    query: function() {
      // the current value of the text field
      var query = this.get('search');
      this.transitionToRoute('search', { query: query });
    },
    sideBar: function() {
      if(this.get('wrapperClass') == ''){
        this.set('wrapperClass','toggled');
      } else {
        this.set('wrapperClass','');
      }

    }
  }
});

App.CalendarDateView = Ember.TextField.extend({
  _picker: null,
 
  modelChangedValue: function(){
    var picker = this.get("_picker");
    if (picker){
      picker.setDate(this.get("value"));
    }
  }.observes("value"),
 
  didInsertElement: function(){
    currentYear = (new Date()).getFullYear();
    formElement = this.$()[0];
    picker = new Pikaday({
      field: formElement,
      yearRange: [1900,currentYear+2]
    });
    this.set("_picker", picker);
  },
 
  willDestroyElement: function(){
    picker = this.get("_picker");
    if (picker) {
      picker.destroy();
    }
    this.set("_picker", null);
  }
});
/*
 * ApplicationRoute
 */
App.ApplicationRoute = Ember.Route.extend({
  actions: {
    showModal: function(name, model) {
      console.log(model);
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
    return Ember.Object.create({ email: 'My email'});
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

App.MysecondModalComponent = Ember.Component.extend({
  actions: {
    ok: function() {
      this.sendAction('ok');
    }
  },
  show: function() {
    this.$('.modal').modal().on('hidden.bs.modal', function() {
      this.sendAction('close');
    }.bind(this));
  }.on('didInsertElement')
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

