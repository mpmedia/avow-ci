/* global io */
define([
  'knockout',
  'session',
  'router',
  'request',
  'dom',
  'timestamp'
], function (ko, session, router, request, dom, timestamp) {

  var create = {

    // Set page title
    pageTitle: 'Create User',

    email: ko.observable(),
    password: ko.observable(),
    confirm_password: ko.observable(),

    // Check if session exists
    before: function (fn) {
      session(function (res) {
        if (!res) {
          // No session, show login
          router.go('/');
        } else {
          fn(true);
        }
      });
    },
    
    load: function () {
      this.email('');
      this.password('');
      this.confirm_password('');
    },

    processCreate: function () {
      if (this.email()!=='' && this.password() === this.confirm_password()) {
        var payload = {
          email: this.email(),
          password: this.password()
        };

        console.log(payload);

        var req = request({
          url: 'api/user/',
          type: 'POST',
          payload: payload
        });

        req.done(function () {
          router.go('/user/list');
        });

        req.fail(function (err) {
          dom.notification('error', JSON.parse(err.responseText).message);
        });
      } else {
        dom.notification('error', 'Please fill out all form fields');
      }
    },

    cancel: function () {
      router.go('/user/list');
    }

  };

  return create;

});