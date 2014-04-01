// Build API
module.exports = {

  // Gets a build or build listing
  'GET': [{
    path: 'default',
    controller: 'build',
    fn: 'getBuilds'
  }, {
    path: ':id',
    controller: 'build',
    fn: 'getBuild'
  }, {
    path: 'project/:id',
    controller: 'build',
    fn: 'getProjectBuilds'
  }, {
    path: 'log/:id',
    controller: 'build',
    fn: 'getLogData'
  }],

  // Triggers a build process
  'POST': {
    controller: 'build',
    fn: 'runBuild'
  }

};
