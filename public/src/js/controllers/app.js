define([
  'composer',
  'knockout',
  'request',
  'dom',
  'router',
  'session'
], function (compose, ko, request, dom, router, session) {

  var app = {

    loggedIn: ko.observable(false),

    logoutUser: function () {
      var req = request({
        url: '/api/user/session',
        type: 'DELETE'
      });

      req.done(function () {
        router.go('/');
      });

      req.fail(function () {
        dom.notification('error', 'There was a problem processing your request');
      });
    },

    // Initializes the application by establishing routes
    init: function () {
      compose(this.routes);
    },

    routes: {
      // USER
      '/': 'user/login',
      // PROJECTS
      '/projects': 'project/list',
      '/projects/:name': 'project/view',
      '/projects/:name/config': 'project/config',
      // STATIC
      '/404': '404'
    },

    // On route loaded
    onRoute: function () {
      var self = this;
      session(function (res) {
        if (!res) {
          // No session
          self.loggedIn(false);
        } else {
          self.loggedIn(true);
        }
      });
    }
  };

  return app;

});
