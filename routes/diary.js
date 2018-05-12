var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dateformat = require('dateformat');
var settings = require('../settings');

function select (res, connection) {
  var query = 'select * from aitalk.diary;';
  connection.query(query, function(err, rows) {
    var new_rows = rows.map((dict) => {
      var date = new Date(dict.date);
      var date = dateformat(date, 'yyyy/mm/dd HH:MM');
      return Object.assign(
        dict, {"date": date, "temperature": dict.temperature}
      )
    });
    res.json(new_rows);
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
