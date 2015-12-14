App.Router.map(function() {
  this.resource("ticket-feed", function(){
    this.route("search", { path: "/:searchVal" });
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
  this.resource("ticket-wallet", function(){
    this.route("load", { path: "/" });
  });
});