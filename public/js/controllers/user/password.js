/* global io */
define([
  'knockout',
  'session',
  'router',
  'request',
  'dom',
  'timestamp'
], function (ko, session, router, request, dom, timestamp) {

  var password = {

    // Set page title
    pageTitle: 'Change Password',

    current_password: ko.observable(),
    new_password: ko.observable(),
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
      this.current_password('');
      this.new_password('');
      this.confirm_password('');
    },

    changePassword: function () {

    },

    cancel: function () {
      router.go('/projects');
    }

  };

  return password;

});