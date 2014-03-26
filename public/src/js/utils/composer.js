define([
  'router',
  'knockout',
  'dom'
], function (router, ko, dom) {

  var count = 0;
  var loaded = 0;

  var controllers = [];

  // Builds route handlers and dom render handlers
  var build = function (route, path) {

    require(['controllers/' + path], function (controller) {

      controllers.push(controller);

      var routeHandler = {};

      // Create before handler
      if (controller.hasOwnProperty('before')) {
        routeHandler.before = controller.before;
      }

      // Build load handler
      var loadView = function (view, controller, args, load) {
        var el = document.getElementById('viewContainer');
        dom.renderView(view);
        ko.cleanNode(el);
        ko.applyBindings(controller, el);
        if (load) {
          controller.load.apply(controller, args);
        }
        $(window).trigger('onRoute');
      };

      // Create load handler
      if (controller.hasOwnProperty('load')) {
        routeHandler.load = function () {
          var args = arguments;
          require(['text!views/' + path + '.html'], function (view) {
            loadView(view, controller, args, true);
          });
        };
      } else {
        routeHandler.load = function () {
          require(['text!views/' + path + '.html'], function (view) {
            loadView(view, controller, [], false);
          });
        };
      }

      // Create unload handler
      if (controller.hasOwnProperty('unload')) {
        routeHandler.unload = controller.unload.bind(controller);
      }

      // Create route
      router.on(route, routeHandler);

      // Increment loaded tracker
      loaded++;

      // On last route, process...
      if (count === loaded) {
        loadApp();
      }

    });
  };

  var loadApp = function () {
    require(['controllers/app', 'text!views/app.html'], function (app, appView) {
      // Load view into main
      dom.$app.html(appView);
      // Apply app bindings
      ko.applyBindings(app);
      // Listen for route change
      $(window).on('onRoute', function () {
        app.onRoute.apply(app);
      });
      // Process routes
      router.process();
    });
  };

  // Loops through and loads routes
  var compose = function (routes) {
    // Get size
    Object.size = function (obj) {
      var size = 0,
        key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          size++;
        }
      }
      return size;
    };

    // Set count
    count = Object.size(routes);

    // Build controller+route handlers
    for (var route in routes) {
      build(route, routes[route]);
    }
  };

  return compose;

});
