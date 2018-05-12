var io = null;
exports.io = function(server) {
  console.log("connected");
  io = require('socket.io')(server);
  return io;
}

exports.send = function() {
  io.sockets.emit('message', 'hell');  
}
