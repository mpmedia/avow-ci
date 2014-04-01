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
    id: ko.observable(),
    commit: ko.observable(),
    config: ko.observable(),
    start: ko.observable(),
    end: ko.observable(),
    status: ko.observable(),

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
      self.id(id);
      var req = request({
        url: '/api/build/'+id
      });
      
      req.done(function (build) {
        var startObj = timestamp.format(build.data.start);
        var endFormat;
        if (build.data.hasOwnProperty('end')) {
          var endObj = timestamp.format(build.data.end);
          endFormat = endObj.month + ' ' + endObj.date + ' at ' + endObj.hour + ':' + endObj.min + ':' + endObj.sec + endObj.ampm;
        } else {
          endFormat = "N/A";
        }
        self.commit(build.data.commit);
        self.config(JSON.stringify(build.data.config, null, 4));
        self.start(startObj.month + ' ' + startObj.date + ' at ' + startObj.hour + ':' + startObj.min + ':' + startObj.sec + startObj.ampm);
        self.end(endFormat);
        self.status(self.getStatus(build.data.status));
      });
    },
    
    getStatus: function (status) {
      var obj = { 0: 'Pass', 1: 'Fail', 2: 'Pending' };
      return obj[status];
    }
  };

  return view;
});
