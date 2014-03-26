define([], function () {

  // Router object
  var Router = function () {
    var self = this;

    // Watch hashchange
    window.onhashchange = function () {
      self.process();
    };

    // Run on load
    window.onload = function () {
      self.process();
    };
  };

  // Container object for routes
  Router.prototype.routes = {};

  // Container array for history
  Router.prototype.history = [];

  // Processes route change
  Router.prototype.process = function () {
    var self = this,
      fragment = window.location.hash.replace('#', '').replace(/^\/|\/$/g, ''),
      match,
      route,
      args,
      prevRoute = false,
      routeObj = [];

    fragment = (fragment.substr(0) !== '/') ? '/' + fragment : fragment;

    match = self.match();
    route = match.route;
    args = match.args;

    // Get prev_route
    if (self.history.length !== 0) {
      prevRoute = self.routes[self.history[self.history.length - 1].matcher];
    }

    routeObj = self.routes[route];

    // Get current route and unload
    if (prevRoute && prevRoute.unload) {
      prevRoute.unload.apply(this);
    }

    // Check and run 'before'
    if (routeObj.hasOwnProperty('before') && typeof routeObj.before === 'function') {
      // Should fire callback with arg 'res' = true/false
      routeObj.before(function (res) {
        if (res && routeObj.load) {
          routeObj.load.apply(this, args);
          self.history.push({
            matcher: route,
            fragment: fragment
          });
        } else {
          self.go(self.history[self.history.length - 1].fragment);
        }
      });
    } else {
      // No 'before', just load...
      routeObj.load.apply(this, args);
      self.history.push({
        matcher: route,
        fragment: fragment
      });
    }

    // Check and run 'load' if fn exists and before has passed
    if (routeObj.load && !routeObj.hasOwnProperty('before')) {
      routeObj.load.apply(this, args);
      self.history.push({
        matcher: route,
        fragment: fragment
      });
    }

  };

  // Matches routes and fires callback
  Router.prototype.match = function () {
    var self = this,
      fragment = window.location.hash.replace('#', '').replace(/^\/|\/$/g, ''),
      matcher,
      route,
      args = [],
      matched = false,
      i,
      z;

    fragment = (fragment.substr(0) !== '/') ? '/' + fragment : fragment;

    // Match root
    if (fragment === '/' && self.routes.hasOwnProperty('/')) {
      matched = {
        route: '/',
        args: null
      };
    } else {
      // Match routes
      for (route in self.routes) {
        matcher = fragment.match(new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)')));
        if (matcher !== null && matcher[0] === fragment) {
          args = [];
          // Get args
          if (matcher.length > 1) {
            for (i = 1, z = matcher.length; i < z; i++) {
              args.push(matcher[i]);
            }
          }
          matched = {
            route: route,
            args: args
          };
        }
      }
    }

    if (!matched) {
      if (self.routes.hasOwnProperty('/404')) {
        matched = {
          route: '/404',
          args: [fragment]
        };
      }
    }

    // Return matched and arguments
    return matched;

  };

  // Method to reload (refresh) the route
  Router.prototype.reload = function () {
    this.process();
  };

  // Method for binding route to callback
  Router.prototype.on = function (route, handler) {
    this.routes[route] = {};
    // Build function(s) into route object
    if (handler && typeof handler === 'function') {
      // Just passed a single load function
      this.routes[route].before = false;
      this.routes[route].load = handler;
      this.routes[route].unload = false;
    } else if (handler && typeof handler === 'object') {
      // Passed an object
      this.routes[route].before = (handler.before) ? handler.before : false;
      this.routes[route].load = (handler.load) ? handler.load : false;
      this.routes[route].unload = (handler.unload) ? handler.unload : false;
    } else {
      throw 'Error creating route';
    }
  };

  // Method for programatically navigating to route
  Router.prototype.go = function (path) {
    var location = window.location,
      root = location.pathname.replace(/[^\/]$/, '$&'),
      url,
      self = this;

    // Handle url composition
    if (path.length) {
      // Fragment exists
      url = root + location.search + '#' + path;
    } else {
      // Null/Blank fragment, nav to root
      url = root + location.search;
    }

    if (history.pushState) {
      // Browser supports pushState()
      history.pushState(null, document.title, url);
      self.process();
    } else {
      // Older browser fallback
      location.replace(root + url);
      self.process();
    }
  };

  var router = new Router();

  return router;

});
