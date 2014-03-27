var runner = require('../lib/modules.js').components.runner;

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

  // Run a build (POST)
  runBuild: function (req, res) {
    var self = this;
    // Find project
    self.data.projects.find({ name: req.params[0] }, function (err, projectData) {
      if (err) {
        // Data store error
        self.sendResponse(res, err, projectData);
      } else if (!projectData.length) {
        // No project found
        self.sendResponse(res, 'No project found', null);
      } else {
        // Have project, insert new record for build
        self.data.builds.insert({
          project_id: projectData[0]._id.toString(),
          start: + new Date()
        }, function (err, data) {
          if (err) {
            // Data store error
            self.sendResponse(res, err, data);
          } else {
            // Start runner with data
            runner.go({
              project: projectData[0],
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
    });
  }

};
