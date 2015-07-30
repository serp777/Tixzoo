App.MainPageController = Ember.ObjectController.extend({
  username: 'Enter Username',
  password: 'Enter Password',
  passwordVerify: 'Verify Password',
  email: 'example@example.com',
  loginSuccess: false,
  backgroundHomePageOne: '/img/backgroundHomePageOne.png',
  backgroundHomePageTwo: '/img/backgroundHomePageTwo.png',
  backgroundHomePageThree: '/img/backgroundHomePageThree.png',
  backgroundHomePageFour: '/img/backgroundHomePageFour.png',
  middleBackground: '/img/middle_bckimg.png',
  bottomBackground: '/img/tixzoo_land.png',
  tixzooLogo: '/img/tixzoo-logo.png',
  affordabilityIcon: '/img/affordability-icon.png',
  facebookIcon: '/img/fb.png',
  instagramIcon: '/img/instagram.png',
  lockIcon: '/img/lock-icon.png',
  peertopeerIcon: '/img/messaging-icon.png',
  snapchatIcon: '/img/',
  twitterIcon: '/img/twitter.png',
  maxFrat: '/img/max-frat.png',
  disclosurePhoto: '/img/disclosure-artist.png',
  searchText: '',
    ticketFeed: function() {
      console.log("test");
      return "";
    }.property('searchText'),
});