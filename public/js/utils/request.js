define([
  'jquery'
], function ($) {

  // Returns jquery defferred for XHR request
  var request = function (reqObj) {
    // Properties
    var url = reqObj.url || false;
    var type = reqObj.type || 'GET';
    var payload = (typeof reqObj.payload === 'object') ? reqObj.payload : {};

    // Return def
    return $.ajax({
      url: url,
      type: type,
      data: payload
    });
  };

  return request;

});
