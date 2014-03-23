# UI Seed

Uses RequireJS, Knockout and jQuery combined with a lightweight router and
composition system to streamline development.

## Usage

### HTML

The `index.html` page consists simply of a container element (`<div>`) with `id`
set to `app`. This is where the main `/views/app.html` gets loaded.

The `/views/app.html` is the main application container and gets bound to any
Knockout objects in `controllers/app.js`. The `views/app.html` page needs to include
an element with `id` set to `viewContainer`. When routes are matched this is where
their views are loaded.

### Main

The `js/main.js` file grabs the `require-config` and loads up the `app.js` file
which contains the core functionality for the application.

### App

The `js/controllers/app.js` file is the initalizer for the application. It includes
an `init` function which loads everything through the composer, route table and
can listen for route changes via `onRoute`. Beyond that, everything else can be
custom to the needs of the application.

The routes are setup with key-value pairing matching the following:

```javascript
'/path/:var': 'path/to/files'
```

The key is the URL route (with optional `:var` param) and the value is the path
(local to `controllers` and `views`). So, for instance:

```javascript
'/users': 'users/list'
```

Would load when `http://yourserver.com/#users` was reached and call the controller
`/js/controllers/users/list.js` with the view `/js/views/users/list.html`.

### Controllers

Each controller has a number of methods which tie into the load/unload of the view:

```javascript
before: function (fn) {
  // Check for condition to allow route to be loaded or not...
  // then fire the fn with boolean to continue or block
  fn(true);
},

load: function () {
  // Do something on route/view load
  // Any params in the URL are passed as arguments
},

unload: function () {
  // Do something when the route/view is unloaded
}
```

### Views

Views are loaded and then cached only when called. Views should follow the pathing
and naming convention of their associated controller.