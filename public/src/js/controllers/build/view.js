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
    pageTitle: 'Build Profile',

    // Create observables
    _id: ko.observable(),
    project: ko.observable(),
    commit: ko.observable('No Commit Data'),
    config: ko.observable('No Config Data'),
    start: ko.observable(),
    duration: ko.observable('Pending'),
    status: ko.observable(),
    log: ko.observable('Loading...'),

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

    load: function (project, id) {
      var self = this;
      self._id(id);
      self.project(project);
      self.duration('Pending');

      this.getData();

      // Watch update socket
      io.connect('/api/builds/').on('update', function (data) {
        // If socket matches build ID and the status is not pending...
        if (data.id === id && data.status === 0 || data.status === 1) {
          // Update the data...
          self.getData();
        }
      });

      // Watch log socket
      io.connect('/api/builds/').on('log', function (data) {
        // If build log socket is for current build
        if (data.id === id) {
          dom.appendBuildLog(data.data);
        }
      });
    },

    getData: function () {
      var self = this;
      // Request build data
      var req = request({
        url: '/api/build/'+self._id()
      });

      req.done(function (build) {
        var curBuild = build.data[0];
        var startStamp = timestamp.common(curBuild.start);
        if (curBuild.hasOwnProperty('end')) {
          self.duration(timestamp.difference(curBuild.start, curBuild.end));
        }
        if (curBuild.hasOwnProperty('commit')) {
          self.commit(JSON.stringify(curBuild.commit, null, 4));
        }
        if (curBuild.hasOwnProperty('config')) {
          self.config(JSON.stringify(curBuild.config, null, 4));
        }
        self.start(startStamp);
        self.status(self.getStatus(curBuild.status));
      });

      var reqLog = request({
        url: '/api/build/log/'+self._id()
      });

      reqLog.done(function (log) {
        self.log(log.data);
      });

      reqLog.fail(function () {
        self.log('ERROR');
      });
    },

    getStatus: function (status) {
      var obj = { 0: 'Pass', 1: 'Fail', 2: 'Pending' };
      return obj[status];
    }
  };

  return view;
});
