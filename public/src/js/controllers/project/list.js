define([
  'knockout',
  'session',
  'router',
  'request',
  'dom'
], function (ko, session, Router, request, dom) {

  var router = new Router();

  var list = {

    projects: ko.observableArray(),

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
      // Clear out projects
      this.projects([]);
      // Get list
      var req = request({
        url: '/api/project'
      });

      req.done(function (data) {
        console.log(data);
      });

      req.fail(function () {
        dom.notification('error', 'Problem loading data');
      });
    }

  };

  return list;

});
