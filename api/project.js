// Project API
module.exports = {

  // Get a project or project listing
  'GET': [
    {
      path: 'default',
      controller: 'project',
      fn: 'getProject'
    },
    {
      path: ':name',
      controller: 'project',
      fn: 'getProject'
    }
  ],

  // Create a new project
  'POST': [
    {
      path: 'default',
      controller: 'project',
      fn: 'createProject'
    },
    {
      path: 'branches',
      controller: 'project',
      fn: 'getBranches'
    }
  ],

  // Update a project
  'PUT': {
    controller: 'project',
    fn: 'updateProject'
  },

  // Delete a project
  'DELETE': {
    controller: 'project',
    fn: 'deleteProject'
  }
};
