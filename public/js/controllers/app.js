define([
  'composer',
  'knockout',
  'request',
  'dom',
  'router',
  'session'
], function (compose, ko, request, dom, router, session) {

  var app = {

    appTitle: 'Avow',

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

    // Initializes the application
    init: function () {
      compose(this);
    },

    transition: 50,

    routes: {
      // USER
      '/': 'user/login',
      '/user/list': 'user/list',
      '/user/create': 'user/create',
      // PROJECTS
      '/projects': 'project/list',
      '/projects/:name': 'project/view',
      '/projects/:name/config': 'project/config',
      // BUILDS
      '/projects/:name/build/:id': 'build/view',
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
          dom.setSessionClass(0);
        } else {
          self.loggedIn(true);
          dom.setSessionClass(1);
        }
      });
    }
  };

  return app;

});
