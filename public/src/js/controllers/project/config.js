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
    availableBranches: ko.observableArray(),

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
      // On repo change list availableBranches
      this.repo.subscribe(function (val) {
        self.getBranches(val);
      });
      // Get list
      var req = request({
        url: '/api/project/' + name
      });

      req.done(function (data) {
        console.log(data);
      });

      req.fail(function () {
        dom.notification('error', 'Problem loading data');
      });
    },

    // Gets branches based on current repo
    getBranches: function (repo) {

      var self = this;
      var name;
      this.availableBranches([]);

      if (this.testRepo(repo)) {
        var req = request({
          url: 'api/project/branches',
          type: 'POST',
          payload: {
            repo: repo
          }
        });

        req.done(function (branches) {
          for (var branch in branches.data) {
            name = branches.data[branch].name.replace('origin/', '');
            if (name !== 'HEAD') {
              self.availableBranches.push(name);
            }
          }
        });

        req.fail(function () {
          self.availableBranches([]);
        });
      }
    },

    // Ensure a .git extension path for repo
    testRepo: function (repo) {
      if (repo.split('.').pop().toLowerCase() === 'git') {
        return true;
      }
      return false;
    }

  };

  return list;

});
