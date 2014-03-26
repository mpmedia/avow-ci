define([
  'knockout',
  'session',
  'router',
  'request',
  'dom'
], function (ko, session, router, request, dom) {

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
      var self = this;
      // Clear out projects
      this.name(null);
      this.repo(null);
      this.branch(null);
      // Get list
      var req = request({
        url: '/api/project/' + name
      });

      req.done(function (project) {
        self.name(project.data[0].name);
        self.repo(project.data[0].repo);
        self.branch(project.data[0].branch);
      });

      req.fail(function () {
        dom.notification('error', 'Problem loading data');
      });
    },

    config: function () {
      router.go('/projects/' + this.name() + '/config');
    }

  };

  return list;

});
