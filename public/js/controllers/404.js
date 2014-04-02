define(['knockout'], function (ko) {
  var notFound = {

    // Set page title
    pageTitle: '404 - Not Found',

    path: ko.observable(),
    load: function (path) {
      this.path(path);
    }
  };

  return notFound;
});
