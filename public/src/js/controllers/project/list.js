/* global io */
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
      // Watch socket
      io.connect('/api/builds/').on('update', function (data) {
        self.updateBuildStatus(data);
      });
      // Clear out projects
      this.projects([]);
      // Get list
      var req = request({
        url: '/api/project'
      });

      req.done(function (projects) {
        console.log(projects);
        for (var project in projects.data) {
          var curProject = projects.data[project];
          // Create URL property
          curProject.url = '#/projects/' + curProject.name;
          // Create config property
          curProject.config = curProject.url + '/config';
          // Project status
          if (!curProject.hasOwnProperty('status')) {
            // Setup observables (no status, i.e. not built yet)
            curProject.status = ko.observable();
            curProject.statusClass = ko.observable('project-status--none');
            curProject.latestBuildURL = ko.observable(false);
          } else {
            // Setup observables (has status)
            curProject.statusClass = ko.observable(self.setStatusClass(curProject.status));
            curProject.status = ko.observable(projects.data[project].status);
            curProject.latestBuildURL = ko.observable('#/build/'+curProject.latest_build);
          }
          // Push into observableArray
          self.projects.push(curProject);
        }
      });

      req.fail(function () {
        dom.notification('error', 'Problem loading data');
      });
    },

    updateBuildStatus: function (data) {
      console.log(data);
      var project = ko.utils.arrayFirst(this.projects(), function(item) {
         return item._id === data.project_id;
      });
      project.status(data.status);
      project.statusClass(this.setStatusClass(data.status));
      project.latestBuildURL('#/build/'+data.id);
    },

    setStatusClass: function (status) {
      switch (status) {
        case 0:
          return 'project-status--pass';
        case 1:
          return'project-status--fail';
        case 2:
          return 'project-status--pending';
      }
    }

  };

  return list;

});
