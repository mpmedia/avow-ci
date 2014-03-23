// User API
module.exports = {

  // Handles user retrieval
  'GET': [{
    path: 'default',
    controller: 'user',
    fn: 'getUsers'
  }, {
    path: ':id',
    controller: 'user',
    fn: 'getUser'
  }, {
    path: 'session',
    controller: 'user',
    fn: 'checkSession'
  }],

  // Create a new user or session
  'POST': [{
    path: 'default',
    controller: 'user',
    fn: 'createUser'
  }, {
    path: 'login',
    controller: 'user',
    fn: 'loginUser'
  }],

  // Update a user
  'PUT': {
    controller: 'user',
    fn: 'updateUser'
  },

  // Delete a user
  'DELETE': [{
    path: 'default',
    controller: 'user',
    fn: 'deleteUser'
  }, {
    path: 'session',
    controller: 'user',
    fn: 'logoutUser'
  }]
};
