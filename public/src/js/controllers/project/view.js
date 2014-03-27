define([
  'knockout',
  'session',
  'router',
  'request',
  'dom',
  'timestamp'
], function (ko, session, router, request, dom, timestamp) {

  var view = {

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
      });

      reqProject.fail(function () {
        dom.notification('error', 'Problem loading data');
      });
    },

    getBuilds: function () {
      var self = this;

      self.builds([]);

      // Get builds
      var reqBuilds = request({
        url: '/api/build/project/'+this._id()
      });

      reqBuilds.done(function (builds) {
        for (var build in builds.data) {
          var curBuild = builds.data[build];
          var start = timestamp.format(curBuild.start);
          curBuild.url = '#/build/'+curBuild._id;
          if (curBuild.hasOwnProperty('end')) {
            curBuild.duration = timestamp.difference(curBuild.start, curBuild.end);
          } else {
            curBuild.duration = "N/A";
          }
          curBuild.start = start.month + ' ' + start.date + ' at ' + start.hour + ':' + start.min + ':' + start.sec + start.ampm;
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
      case 2:
        return 'project-status--pending';
      }
    }

  };

  return view;

});
