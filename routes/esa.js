var express = require('express');
var settings = require('../settings');
var router = express.Router();
var socket = require('../socketio/index');

router.get('/', function(req, res, next) {
  console.log("エサを送りました");
  res.json({ name: 'エサを送りました' });
  socket.send();
});

module.exports = router;
