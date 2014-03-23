define([
  'knockout'
], function (ko) {

  var view = {

    name: ko.observable(),

    // Check if session exists
    before: function (fn) {
      console.log('BEFORE');
      setTimeout(function () {
        fn(true);
      }, 500);
    },

    load: function (name) {
      this.name(name);
      console.log(arguments);
      console.log('LOADED');
    },

    unload: function () {
      console.log('UNLOADED');
    }

  };

  return view;

});
