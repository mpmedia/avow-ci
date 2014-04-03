// Initializes controllers
var modules = require('./modules');
var config = require('./config.js');
var data;
var dataRef;
var sockets;
var socketRef;
var controller;
var i, z;

// This funcition loops through all of the controllers loaded by the modules.load
// in index.js.
//
// It checks first to ensure a connection property `data` exists and has elements
// then loops through each of those and reassigns the controller's data attribute
// with an object containing connections to the data source, model, adapter, and
// validation objects so they are available to the controller
//
// Lastly it checks for a controller `init` method and if present, calls the
// function

var controllers = function () {
  modules.lib.stdout('title', 'INITIALIZING CONTROLLERS');
  for (var ctrl in modules.controllers) {

    // Set controller var
    controller = modules.controllers[ctrl];

    // Set empty data object
    data = {};

    // Ensure controller has data property and is populated
    if (!controller.hasOwnProperty('data') || !controller.data.length) {
      modules.lib.stdout('error', ctrl + ' is missing a data source');
      return;
    }

    // Loops through controller data array and instantiates data connection
    for (i = 0, z = controller.data.length; i<z; i++) {

      // Set data reference
      dataRef = controller.data[i];

      // Set data reference to new instantiation of the adapter
      // This instantiation sends the table/store (reference) and the db config
      data[dataRef] = new modules.adapters[config.get('db.adapter')](dataRef, config.get('db.config'));

      // Check for (and set) the model
      if (modules.models.hasOwnProperty(dataRef)) {
        data[dataRef].model = modules.models[dataRef];

        // Since a model exists, ensure validation is available and add it to the
        // data reference
        if (modules.lib.hasOwnProperty('validation')) {
          data[dataRef].validate = modules.lib.validation;
        }
      }

    }

    // Set the controller's data property to the compiled object
    controller.data = data;

    // Set socket namespaces
    if (controller.hasOwnProperty('sockets') && controller.sockets.length && modules.lib.hasOwnProperty('socketio')) {
      sockets = {};
      for (i=0, z=controller.sockets.length; i<z; i++) {
        socketRef = controller.sockets[i];
        sockets[socketRef] = modules.lib.socketio.getNamespace(socketRef);
      }

      // Set the controller's socket property to the compiled object
      controller.sockets = sockets;

    }

    // Make config available in the controller object
    controller.config = config.get();

    // Make modules available in the controller object
    controller.modules = modules;


    // Check for, then call `init` method on the controller
    if (controller.hasOwnProperty('init')) {
      controller.init();
    }

    // Output that the controller was loaded
    modules.lib.stdout('output', 'INITIALIZED ' + ctrl);

  }
};

module.exports = controllers;