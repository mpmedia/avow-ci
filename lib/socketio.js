// Socket.io lib
// Maintains the IO object and creates namespaces
// when initializing controllers
var socketio = {

  // This will hold the IO object once the socket is
  // successfully up and running.
  io: null,

  // Set in index after server is built up
  setIO: function (io) {
    this.io = io;
  },

  // Simply builds namespaces for use in controllers
  getNamespace: function (namespace) {
    return this.io.of('/api/' + namespace + '/');
  }
};

module.exports = socketio;
