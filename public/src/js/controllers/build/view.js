define([
  'knockout',
  'session',
  'router',
  'request',
  'dom'
], function (ko, session, router, request, dom) {

  var view = {

    // Create observables
    id: ko.observable(),

    // Check if session exists
    before: function (fn) {
      session(function (res) {
        if (!res) {
          // No session, show login
          router.go('/');
        } else {
          fn(true);
        }
      });
    },
    
    load: function (id) {
      this.id(id);
      console.log(id);
    }
  };

  return view;
});
