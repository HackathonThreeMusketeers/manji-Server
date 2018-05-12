module.exports = function(server) {
  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
    socket.on('message', function(msg) {
    console.log('message: ' + msg);
      io.emit("chat", stdout);
    });
  });
  return io;
}

