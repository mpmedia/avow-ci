define([
  'jquery'
], function ($) {

  var dom = {

    $app: $('#app'),

    renderView: function (view) {
      var $vC = $('#viewContainer');
      $vC.html(view);
    },

    notification: function (type, message) {
      var $notification = $('#notification');
      $notification.addClass(type).html(message);
      setTimeout(function () {
        $notification.removeClass(type);
      }, 3000);
    }

  };

  return dom;

});
