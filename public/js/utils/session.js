define([
  'request'
], function (request) {

  var session = function (cb) {
    var req = request({
      url: '/api/user/session'
    });

    // Session active
    req.done(function () {
      cb(true);
    });

    // Session inactive
    req.fail(function () {
      cb(false);
    });
  };

  return session;

});
