define([
  'knockout',
  'session',
  'router',
  'request',
  'dom'
], function (ko, session, Router, request, dom) {

  var router = new Router();

  var list = {

    name: ko.observable(),
    repo: ko.observable(),
    branch: ko.observable(),

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

    load: function (name) {
      // Clear out projects
      this.name(null);
      this.repo(null);
      this.branch(null);
      // Get list
      var req = request({
        url: '/api/project/'+name
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