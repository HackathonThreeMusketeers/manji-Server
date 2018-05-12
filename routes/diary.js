var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var settings = require('../settings');

function select (res, connection) {
  var query = 'select * from aitalk.diary;';
  connection.query(query, function(err, rows) {
    res.json(rows);
  });
}

router.get('/', function(req, res, next) {
  var options = {
    host: settings.host,
    user: settings.user,
    password: settings.password,
    database: settings.db
  };
  var connection = mysql.createConnection(options);
  connection.connect(err => {
    if(err) {
      throw err;
    }
    select(res, connection);
  });
});
module.exports = router;
