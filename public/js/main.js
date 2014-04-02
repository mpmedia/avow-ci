require(['require-config'], function () {
  require([
    'controllers/app'
  ], function (app) {
    // FIRE IT UP!
    app.init();
  });
});
