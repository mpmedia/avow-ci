// Build Controller
module.exports = {

  // Build data
  data: ['builds'],

  // Build socket namespace
  sockets: ['build'],

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
      'project_id': req.params.id
    }, function (err, data) {
      self.sendResponse(res, err, data);
    });
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

  }

};
