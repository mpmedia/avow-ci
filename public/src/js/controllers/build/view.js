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
    commit: ko.observable(),
    config: ko.observable(),
    start: ko.observable(),
    duration: ko.observable(),
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

      // Request build data
      var req = request({
        url: '/api/build/'+id
      });

      req.done(function (build) {
        var curBuild = build.data[0];
        var startStamp = timestamp.common(curBuild.start);
        if (curBuild.hasOwnProperty('end')) {
          self.duration(timestamp.difference(curBuild.start, curBuild.end));
        } else {
          self.duration('N/A');
        }
        self.commit(JSON.stringify(curBuild.commit, null, 4));
        self.config(JSON.stringify(curBuild.config, null, 4));
        self.start(startStamp);
        self.status(self.getStatus(curBuild.status));
      });

      var reqLog = request({
        url: '/api/build/log/'+id
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
