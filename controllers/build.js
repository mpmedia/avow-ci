var Runner = require('../lib/modules.js').components.runner;
var fs = require('fs');

// Build Controller
module.exports = {

  // Build data
  data: ['builds', 'projects'],

  // Build socket namespace
  sockets: ['builds'],

  // Get build by id (GET)
  getBuild: function (req, res) {
    var self = this;
    self.data.builds.find({
      '_id': req.params.id
    }, function (err, data) {
      self.sendResponse(res, err, data);
    });
  },

  getProjectBuilds: function (req, res) {
    var self = this;
    self.data.builds.find({
      'project_id': req.params.id.toString()
    }, function (err, data) {
      self.sendResponse(res, err, data);
    }, 20, { $natural: -1 });
  },

  // Get build list (GET)
  getBuilds: function (req, res) {
    var self = this;
    // Get list
    self.data.builds.all(function (err, data) {
      self.sendResponse(res, err, data);
    });
  },

  // Get build log data
  getLogData: function (req, res) {
    var self = this;
    fs.readFile(__dirname+'/../logs/'+req.params.id+'.log', 'utf-8', function (err, data) {
      if (err) {
        self.sendResponse(res, 'NO DATA');
      } else {
        self.sendResponse(res, false, data);
      }
    });
  },

  sendResponse: function (res, err, data) {
    if (err) {
      res.send(400, {
        'status': 'error',
        'message': err
      });
    } else {
      res.send(200, {
        'status': 'success',
        'data': data
      });
    }
  },

  // Process manual run
  processRunRequest: function (req, res) {
    var self = this;
    var query;

    // Check request type (Github hook or manual)
    if (req.params[0]) {
      // Manual trigger
      query = { name: req.params[0] };
    } else {
      // Github hook
      var payload = JSON.parse(req.body.payload);
      var repo = 'git@github.com:'+payload.repository.url.replace('https://github.com/','')+'.git';
      var branch = payload.ref.replace('refs/heads/', '');
      query = { repo: repo, branch: branch };
    }

    self.data.projects.find(query, function (err, projectData) {
      if (err) {
        // Data store error
        self.sendResponse(res, err, null);
      } else if (!projectData.length) {
        // No project found
        self.sendResponse(res, 'No project found', null);
      } else {
        // Trigger build
        self.runBuild(projectData[0], res);
      }
    });
  },

  // Run a build (POST)
  runBuild: function (project, res) {
    var self = this;
    // Insert new record for build
    self.data.builds.insert({
      project_id: project._id.toString(),
      start: + new Date()
    }, function (err, data) {
      if (err) {
        // Data store error
        self.sendResponse(res, err, data);
      } else {
        // Start runner with data
        var build = new Runner({
          project: project,
          projectDB: self.data.projects,
          build: data[0],
          buildDB: self.data.builds,
          buildSocket: self.sockets.builds
        });
        // Send response with the new build data
        self.sendResponse(res, false, data);
      }
    });
  }

};
