define([
  'knockout',
  'session',
  'router',
  'request',
  'dom'
], function (ko, session, router, request, dom) {

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
      var self = this;
      // Clear out projects
      this.projects([]);
      // Get list
      var req = request({
        url: '/api/project'
      });

      req.done(function (projects) {
        for (var project in projects.data) {
          // Create URL property
          projects.data[project].url = '#/projects/' + projects.data[project].name;
          // Create config property
          projects.data[project].config = projects.data[project].url + '/config';
          // Push into observableArray
          self.projects.push(projects.data[project]);
        }
      });

      req.fail(function () {
        dom.notification('error', 'Problem loading data');
      });
    }

  };

  return list;

});
