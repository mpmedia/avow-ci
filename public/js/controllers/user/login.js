define([
  'knockout',
  'session',
  'router',
  'request',
  'dom'
], function (ko, session, router, request, dom) {

  var login = {

    // Set page title
    pageTitle: 'Login',

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

    load: function () {
      this.email('');
      this.password('');
      if (localStorage.getItem('email') !== '') {
        this.email(localStorage.getItem('email'));
        $('.login-password').focus();
      } else {
        $('.login-email').focus();
      }
    },

    processLogin: function () {
      var self = this;
      var req = request({
        url: '/api/user/login',
        type: 'POST',
        payload: {
          email: this.email(),
          password: this.password()
        }
      });

      req.done(function (login) {
        localStorage.setItem('email', self.email());
        localStorage.setItem('id', login.data);
        router.go('/projects');
      });

      req.fail(function (err) {
        dom.notification('error', JSON.parse(err.responseText).message);
      });
    }

  };

  return login;

});
