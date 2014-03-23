define(['knockout'], function (ko) {
  var notFound = {
    path: ko.observable(),
    load: function (path) {
      this.path(path);
    }
  };

  return notFound;
});
