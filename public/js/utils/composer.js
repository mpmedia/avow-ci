define([
  'router',
  'knockout',
  'dom'
], function (router, ko, dom) {

  // Base vars
  var count = 0;
  var loaded = 0;
  var appTitle = false;
  var transition = 0;
  var controllers = [];
  var container = 'viewContainer';

  // Sets title
  var setTitle = function (pageTitle) {
    // Both app and page title
    if (appTitle && pageTitle) {
      document.title = pageTitle + ' | ' + appTitle;
    }
    // App title only
    if (appTitle && !pageTitle) {
      document.title = appTitle;
    }
    // Page title only
    if (!appTitle && pageTitle) {
      document.title = pageTitle;
    }
  };

  // Build load handler
  var loadView = function (view, controller, args, load) {
    var el = document.getElementById(container);
    // Transition-out
    $(el).fadeOut(transition, function () {
      // Set html
      $(el).html(view);
      // Bind it up
      ko.cleanNode(el);
      ko.applyBindings(controller, el);
      // Process transition-in
      $(this).fadeIn(transition);
    });
    if (load) {
      controller.load.apply(controller, args);
    }
    // Publish onRoute
    $(window).trigger('onRoute');
    // Set page title
    if (controller.hasOwnProperty('pageTitle')) {
      setTitle(controller.pageTitle);
    } else {
      setTitle(false);
    }
  };

  // Builds route handlers and dom render handlers
  var build = function (route, path) {

    require(['controllers/' + path], function (controller) {

      controllers.push(controller);

      var routeHandler = {};

      // Create before handler
      if (controller.hasOwnProperty('before')) {
        routeHandler.before = controller.before;
      }

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

  // Loops through and loads routes, sets app properties
  var compose = function (app) {
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

    // Set title
    appTitle = (app.hasOwnProperty('appTitle')) ? app.appTitle : false;
    setTitle('Loading');

    // Set transition
    transition = (app.hasOwnProperty('transition')) ? app.transition : 0;

    // Set count
    count = Object.size(app.routes);

    // Build controller+route handlers
    for (var route in app.routes) {
      build(route, app.routes[route]);
    }
  };

  return compose;

});
