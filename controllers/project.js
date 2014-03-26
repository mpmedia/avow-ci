var git = require('../lib/modules.js').components.git;

// Project Controller
module.exports = {

  // Project data
  data: ['projects'],

  // Project sockect namespace
  sockets: ['project'],

  // Called by api/projects "GET"
  getProject: function (req, res) {
    var self = this;
    if (req.params.name) {
      // Get by id
      self.data.projects.find({
        'name': req.params.name
      }, function (err, data) {
        self.sendResponse(res, err, data);
      });
    } else {
      // Get list
      self.data.projects.all(function (err, data) {
        self.sendResponse(res, err, data);
      });
    }
  },

  // Called by api/projects/branches
  getBranches: function (req, res) {
    var self = this;
    git.branches(req.body.repo, function (err, branches) {
      if (err) {
        self.sendResponse(res, err);
      } else {
        self.sendResponse(res, err, branches);
      }
    });
  },

  // Called by api/projects "POST"
  createProject: function (req, res) {
    var self = this;
    self.data.projects.validate(req.body, function (err, failures) {
      if (err) {
        self.sendValidationErr(res, failures);
      } else {
        self.data.projects.insert(req.body, function (err, data) {
          self.sendResponse(res, err, data);
        });
      }
    });
  },

  // Called by api/projects "PUT"
  updateProject: function (req, res) {
    var self = this;
    self.data.projects.validate(req.body, function (err, failures) {
      if (err) {
        self.sendValidationErr(res, failures);
      } else {
        self.data.projects.update({
          '_id': req.params[0]
        }, req.body, function (err, data) {
          if (err) {
            self.sendResponse(res, err, data);
          } else {
            self.sendResponse(res, err, data);
          }
        });
      }
    });
  },

  // Called by api/projects "DELETE"
  deleteProject: function (req, res) {
    var self = this;
    self.data.projects.remove({
      '_id': req.params[0]
    }, function (err, data) {
      self.sendResponse(res, err, data);
    });
  },

  // Sends out validation errors
  sendValidationErr: function (res, failures) {
    res.send(400, {
      'status': 'error',
      'message': 'Failed validation on ' + failures.join()
    });
  },

  // Sends response to data query
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
  }
};
