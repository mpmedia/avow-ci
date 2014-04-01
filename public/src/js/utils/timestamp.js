define(function () {

  var timestamp = {

    // Returns object with formatted parts of timestamp
    format: function (ts) {
      var a = new Date(ts);
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var ampm = (a.getHours() >= 12) ? 'pm' : 'am';
      var hour = (a.getHours() > 12) ? a.getHours() - 12 : a.getHours();
      var min = (a.getMinutes() < 10) ? '0' + a.getMinutes() : a.getMinutes();
      var sec = (a.getSeconds() < 10) ? '0' + a.getSeconds() : a.getSeconds();
      return {
        year: a.getFullYear(),
        month: months[a.getMonth()],
        date: a.getDate(),
        hour: hour,
        min: min,
        sec: sec,
        ampm: ampm
      };
    },

    // Returns difference between two timestamps
    difference: function (start, end) {
      var diff = end - start;
      return diff;
    }

  };

  return timestamp;

});
