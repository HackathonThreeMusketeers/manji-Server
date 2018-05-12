module.exports = function(server) {
  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
    console.log('connected');
    socket.on('message', function(msg) {
    console.log('message: ' + msg);
      io.emit("chat", stdout);
    });
  });
  return io;
}

