// Node hash for passwords
var passwordHash = require('password-hash');

// User Controller
module.exports = {

  // User Data
  data: ['users'],

  // User socket namespace
  sockets: ['user'],
  
  // Get list
  getList: function (cb) {
    this.data.users.all(function (err, data) {
      var list = [];
      for(var i=0, z=data.length; i<z; i++) {
        list.push(data[i].email);
      }
      cb(err, list);
    });
  },

  // Get user or user (GET)
  getUser: function (req, res) {
    var self = this;
    self.data.users.find({
      '_id': req.params[0]
    }, function (err, data) {
      if (!err) {
        // Don't send password
        delete data.password;
      }
      self.sendResponse(res, err, data);
    });
  },

  // Get all users (GET)
  getUsers: function (req, res) {
    var self = this;
    self.data.users.all(function (err, data) {
      if (!err) {
        // Don't send passwords
        delete data.password;
      }
      self.sendResponse(res, err, data);
    });
  },

  // Check for user session (GET '/session')
  checkSession: function (req, res) {
    if (req.session.user === true) {
      res.send(200, {
        'status': 'success'
      });
    } else {
      res.send(401, {
        'status': 'error'
      });
    }
  },

  // Login a user (POST)
  loginUser: function (req, res) {
    var self = this;
    self.data.users.find({
      'email': req.body.email
    }, function (err, data) {
      if (err) {
        self.sendResponse(res, err, data);
      } else {
        if (data.length) {
          if (passwordHash.verify(req.body.password, data[0].password)) {
            req.session.user = true;
            res.send(200, {
              status: 'success',
              data: data[0]._id
            });
          } else {
            res.send(401, {
              status: 'error',
              message: 'Incorrect password'
            });
          }
        } else {
          res.send(401, {
            status: 'error',
            message: 'Incorrect email'
          });
        }
      }
    });
  },

  // Logout a user (DELETE)
  logoutUser: function (req, res) {
    req.session.user = false;
    res.send(200, {
      status: 'success'
    });
  },

  // Create a new user (POST)
  createUser: function (req, res) {
    var self = this;
    self.data.users.validate(req.body, function (err, failures) {
      if (err) {
        self.sendValidationErr(res, failures);
      } else {
        // Ensure no duplicate emails
        self.data.users.find({
          'email': req.body.email
        }, function (err, data) {
          if (data.length) {
            self.sendResponse(res, 'Email already in use');
          } else {
            console.log(req.body);
            req.body.password = passwordHash.generate(req.body.password);
            self.data.users.insert(req.body, function (err, data) {
              self.sendResponse(res, err, data);
            });
          }
        });
      }
    });
  },

  // Update existing user (PUT)
  updateUser: function (req, res) {
    var self = this;
    self.data.users.validate(req.body, function (err, failures) {
      if (err) {
        self.sendValidationErr(res, failures);
      } else {
        if (req.body.hasOwnProperty('password')) {
          req.body.password = passwordHash.generate(req.body.password);
        }
        self.data.users.update({
          '_id': req.params[0]
        }, req.body, function (err, data) {
          self.sendResponse(res, err, data);
        });
      }
    });
  },

  // Delete a user (DELETE)
  deleteUser: function (req, res) {
    var self = this;
    self.data.users.remove({
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
