var loaderObj = {
    templates : [
    'modal.html',
    'ticketfeed.html',
    'mainpage.html',
    'postticket.html',
    'userprofile.html',
    'viewticket.html',
    'confirmticket.html',
    'customersupport.html',
    'ticketwallet.html'
    ],
    css : [
    'bootstrap.css',
    'simple-sidebar.css',
    'pickaday.css',
    'buttons.css',
    'normalize.css',
    'search.css',
    'slideshow.css',
    'ticket-feed.css',
    'to-post-ticket.css',
    'user-profile.css',
    'view-ticket.css',
    'customer-support.css',
    'ticket-wallet.css',
    'media_queries.css'
  ]
};

loadCss(loaderObj.css);
loadTemplates(loaderObj.templates);

App = Ember.Application.create();

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
            url: 'app/views/tmpl/' + this,
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
            url: 'public/css/' + this,
            success: function(resp) {
                tempObjCss.html(resp);
                $('body').append(tempObjCss);
            }
        });
    });
}


App.ApplicationController = Ember.Controller.extend({
  email: '',
  password: '',
  loginSuccess: false,
  wrapper: 'wrapper',
  wrapperClass: '',
  artist: '',
  artistText: 'Artist | Event',
  venue: '',
  venueText: 'Venue',
  date: '',
  dateVal: '',
  dateText: 'Date',
  tixzooLogo: '/public/img/tixzoo-logo.png',
  quantity: '',
  quantityText: 'Quantity',
  price: '',
  searchMag: '/public/img/searchbar1.png',
  route: 'main-page',
  ticketJson: [],
  tempTicketJson: [],
  facebookIcon: '/public/img/fb.png',
  instagramIcon: '/public/img/instagram.png',
  lockIcon: '/public/img/lock-icon.png',
  peertopeerIcon: '/public/img/messaging-icon.png',
  snapchatIcon: '/public/img/',
  twitterIcon: '/public/img/twitter.png',
  init: function() {
    this._super();
    var url = window.location.href.split("/");
    if(url[3].split("=")[0] == "?id"){
      this.set('test123',true);
      var that = this;
      //ajax stuff
      $.ajax({
        url: "Rest/mainController.php",
        type: "POST",
        dataType:'json',
        data: {verifyMode: "true", confirm: url[3].split("=")[1]},
        success: function(data) {
          console.log("good");
        },
        error: function(data){
          console.log(data);
          //some error handling if invalid
          that.transitionToRoute(that.get('route'));
          }
      }).done(function(){
        //that.transitionToRoute(that.get('route'));
        window.location.replace("http://mytixzoo.com/#/main-page");
      });

    } else {
      if(url[3] === null || url[3] === "" || url[4] === null || url[4] === ""){
        this.transitionToRoute(this.get('route'));
      }
    }

  },
  sendCreditCardInfo: function(email, response) {
      return $.ajax({
          url: "Rest/stripe/stripeController.php",
          type: "POST",
          dataType:'json',
          data: {email: email, response: response},
          error: function(data){
            console.log(data);
          }
      });
  },
  getCookies: function() {
        return $.ajax({
          url: "Rest/mainController.php",
          type: "GET",
          dataType:'json',
          data: {cookieMode: true},
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
  clearInfo: function() {
    this.set('email', '');
    this.set('password', '');
    this.set('loginSuccess', false);
  },
    actions: {
      logout: function() {
        this.clearInfo();
        var that = this;
        var message = null;
        var xhr = $.ajax({
          url: "Rest/mainController.php",
          type: "GET",
          data: {logoutMode: "true"},
            success: function(data){
              console.log(data);
            }
          });
        if (xhr.status != 200) { // error
            message = { errorCode: xhr.status, errorMessage: xhr.statusText };
        }
        return message;
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







