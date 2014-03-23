define([
  'knockout',
  'session',
  'router',
  'request',
  'dom'
], function (ko, session, Router, request, dom) {
  
  var router = new Router();

  var login = {

    email: ko.observable(),
    password: ko.observable(),

    // Check if session exists
    before: function (fn) {
      session(function (res) {
        if (!res) {
          // No session, show login
          fn(true);
        } else {
          router.go('/projects');
        }
      });
    },

    processLogin: function () {
      var req = request({
        url: '/api/user/login',
        type: 'POST',
        payload: {
          email: this.email(),
          password: this.password()
        }
      });

      req.done(function () {
        router.go('/projects');
      });

      req.fail(function (err) {
        dom.notification('error', JSON.parse(err.responseText).message);
      });
    }

  };

  return login;

});
