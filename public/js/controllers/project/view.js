/* global io */
define([
  'knockout',
  'session',
  'router',
  'request',
  'dom',
  'timestamp'
], function (ko, session, router, request, dom, timestamp) {

  var view = {

    // Set page title
    pageTitle: 'Project Details',

    _id: ko.observable(),
    name: ko.observable(),
    repo: ko.observable(),
    branch: ko.observable(),
    builds: ko.observableArray(),

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
      // Get project
      var reqProject = request({
        url: '/api/project/' + name
      });

      reqProject.done(function (project) {
        self._id(project.data[0]._id);
        self.name(project.data[0].name);
        self.repo(project.data[0].repo);
        self.branch(project.data[0].branch);
        self.getBuilds();

        // Watch update socket
        io.connect('/api/builds/').on('update', function (data) {
          // If socket matches project ID
          if (data.project_id === self._id()) {
            // Update the builds...
            self.getBuilds();
          }
        });

      });

      reqProject.fail(function () {
        dom.notification('error', 'Problem loading data');
      });
    },

    getBuilds: function () {
      var self = this;

      // Get builds
      var reqBuilds = request({
        url: '/api/build/project/' + this._id()
      });

      reqBuilds.done(function (builds) {
        self.builds([]);
        for (var build in builds.data) {
          var curBuild = builds.data[build];
          curBuild.url = '#/projects/' + self.name() + '/build/' + curBuild._id;
          if (curBuild.hasOwnProperty('end')) {
            curBuild.duration = timestamp.difference(curBuild.start, curBuild.end);
          } else {
            curBuild.duration = 'N/A';
          }
          if (curBuild.hasOwnProperty('commit')) {
            curBuild.commitmsg = curBuild.commit.message.substr(0, 35) + '&hellip;';
          } else {
            curBuild.commitmsg = 'NO COMMIT MESSAGE';
          }
          curBuild.start = timestamp.common(curBuild.start);
          curBuild.statusClass = self.setStatusClass(curBuild.status);
          self.builds.push(curBuild);
        }
      });

      reqBuilds.fail(function () {
        dom.notification('error', 'Could not load build data');
      });
    },

    config: function () {
      router.go('/projects/' + this.name() + '/config');
    },

    setStatusClass: function (status) {
      switch (status) {
      case 0:
        return 'project-status--pass';
      case 1:
        return 'project-status--fail';
      default:
        return 'project-status--pending';
      }
    }

  };

  return view;

});
