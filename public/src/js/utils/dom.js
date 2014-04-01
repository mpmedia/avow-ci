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
    },
    
    startBuildSpinner: function (project) {
      $('.build-spinner[data-project="'+project+'"] i').addClass('fa-spin');
    }

  };

  return dom;

});
