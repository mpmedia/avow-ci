define([
  'knockout',
  'session',
  'router',
  'request',
  'dom'
], function (ko, session, router, request, dom) {

  var list = {

    // Create observables
    newProject: ko.observable(true),
    _id: ko.observable(),
    name: ko.observable(),
    repo: ko.observable(),
    branch: ko.observable(),
    availableBranches: ko.observableArray(),
    deleteText: ko.observable(),

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

    // Initializes the data either blank (new) or from API
    load: function (name) {

      var self = this;
      // Clear out model
      this.newProject(true);
      this._id('');
      this.name('');
      this.repo('');
      this.branch('master');
      this.deleteText('Delete');
      // On repo change list availableBranches
      this.repo.subscription = this.repo.subscribe(function (val) {
        self.getBranches(val);
      });
      // Pull project
      if (name !== 'new') {
        // Get list
        var req = request({
          url: '/api/project/' + name
        });

        req.done(function (project) {
          if (project.data.length) {
            self.newProject(false);
            self._id(project.data[0]._id);
            self.name(project.data[0].name);
            self.repo(project.data[0].repo);
            self.branch(project.data[0].branch);
          } else {
            dom.notification('error', 'Could not find project');
          }
        });

        req.fail(function () {
          dom.notification('error', 'Problem loading data');
        });
      }
    },

    unload: function () {
      // Cleanup subscription on availableBranches
      this.repo.subscription.dispose();
    },

    // Saves data based on type update (PUT) or create (POST)
    saveProject: function () {
      var self = this;
      // Set url
      var url = (self.newProject()) ? 'api/project/' : 'api/project/' + self._id();
      // Set type
      var type = (self.newProject()) ? 'POST' : 'PUT';
      // Set payload
      var payload = {
        name: self.name(),
        repo: self.repo(),
        branch: self.branch()
      };

      // Ensure valid data
      if (self.testRepo() && self.testName() && self.testBranch()) {
        // Make request
        var req = request({
          url: url,
          type: type,
          payload: payload
        });

        // On success
        req.done(function () {
          dom.notification('success', self.name() + ' saved successfully');
          router.go('/projects/' + self.name() + '/config');
        });

        // On fail
        req.fail(function () {
          // Show message
          dom.notification('error', 'Project could not be saved');
        });
      } else {
        dom.notification('error', 'Please ensure all fields are properly filled out');
      }
    },

    // Uses an observable to monitor delete/confirm status, then deletes project from API
    deleteProject: function () {
      var self = this;
      if (this.deleteText() === 'Delete') {
        // Show confirmation
        this.deleteText('Confirm Delete?');
      } else {
        // Delete the project
        var req = request({
          url: 'api/project/' + this._id(),
          type: 'DELETE'
        });
        // On success, go to project listing
        req.done(function () {
          dom.notification('success', self.name() + ' has been deleted');
          router.go('/projects');
        });

        // On fail, tell user
        req.fail(function () {
          dom.notification('error', 'Could not delete the project');
        });
      }
    },

    cancel: function () {
      router.go('/projects');
    },

    // Gets branches based on current repo
    getBranches: function (repo) {

      var self = this;
      var name;
      this.availableBranches([]);

      if (this.testRepo()) {
        var req = request({
          url: 'api/project/branches',
          type: 'POST',
          payload: {
            repo: repo
          }
        });

        // On success, loop branches into availableBranches array
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
    testRepo: function () {
      if (this.repo() !== '' && this.repo().split('.').pop().toLowerCase() === 'git') {
        return true;
      }
      dom.notification('error', 'Repo should be a Git URL ending in .git');
      return false;
    },

    // Test 'name' for alphanumeric and hyphens only
    testName: function () {
      if (/^[a-z0-9-]+$/i.test(this.name()) && this.name !== '') {
        return true;
      }
      dom.notification('error', 'Name can contain only letters, numbers and hyphens');
      return false;
    },

    // Test that branch not blank
    testBranch: function () {
      if (this.branch() !== '') {
        return true;
      }
      dom.notification('error', 'Branch must not be empty');
      return false;
    }

  };

  return list;

});
