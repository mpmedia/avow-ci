/* global io */
define([
  'knockout',
  'session',
  'router',
  'request',
  'dom',
  'timestamp'
], function (ko, session, router, request, dom, timestamp) {

  var list = {

    // Set page title
    pageTitle: 'Users',

    users: ko.observableArray(),

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
      var self = this;

      self.users([]);

      var req = request({
        url: '/api/user/'
      });

      req.done(function (users) {
        for (var i=0, z=users.data.length; i<z; i++) {
          self.users.push(users.data[i]);
        }
      });

      req.fail(function () {
        dom.notification('error', 'Could not get user list');
      });
    },

    create: function () {
      router.go('/user/create');
    },

    deleteUser: function (user) {
      if (user._id === localStorage.getItem('id')) {
        dom.notification('error', 'Cannot delete your own account');
      } else {
        var req = request({
          url: 'api/user/' + user._id,
          type: 'DELETE'
        });

        req.done(function () {
          dom.notification('success', 'Account &apos;'+user.email+'&apos; has been deleted');
          $('tr[data-id="'+user._id+'"]').fadeOut(200, function () {
            $(this).remove();
          });
        });

        req.fail(function () {
          dom.notification('error', 'Could not delete account &apos;'+user.email+'&apos;');
        });
      }
    }

  };

  return list;

});