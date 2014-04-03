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
      var self = this;
      // Check current password
      var reqCur = request({
        url: 'api/user/login/',
        type: 'POST',
        payload: {
          email: localStorage.getItem('email'),
          password: self.current_password()
        }
      });

      // If current password works process changes
      reqCur.done(function () {
        if (self.new_password() === self.confirm_password()) {
          var reqChange = request({
            url: 'api/user/'+localStorage.getItem('id'),
            type: 'PUT',
            payload: {
              password: self.new_password()
            }
          });

          reqChange.done(function () {
            dom.notification('success', 'Password successfully changed');
            router.go('/projects');
          });

          reqChange.fail(function () {
            dom.notification('error', 'Could not change password');
          });
        } else {
          dom.notification('error', 'New passwords do not match');
        }
      });

      reqCur.fail(function () {
        dom.notification('error', 'Incorrect current password');
      });
    },

    cancel: function () {
      router.go('/projects');
    }

  };

  return password;

});