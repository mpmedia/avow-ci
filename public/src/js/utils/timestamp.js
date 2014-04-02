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
      var milliseconds = parseInt((diff % 1000) / 100, 10);
      var seconds = parseInt((diff / 1000) % 60, 10);
      var minutes = parseInt((diff / (1000 * 60)) % 60, 10);
      var hours = parseInt((diff / (1000 * 60 * 60)) % 24, 10);

      hours = (hours < 10) ? '0' + hours : hours;
      minutes = (minutes < 10) ? '0' + minutes : minutes;
      seconds = (seconds < 10) ? '0' + seconds : seconds;

      return minutes + ':' + seconds + '.' + milliseconds;
    },

    // Returns common format
    common: function (ts) {
      var obj = this.format(ts);
      return obj.month + ' ' + obj.date + ' at ' + obj.hour + ':' + obj.min + ':' + obj.sec + obj.ampm;
    }

  };

  return timestamp;

});
