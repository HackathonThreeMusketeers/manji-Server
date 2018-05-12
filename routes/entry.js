var express = require('express');
var formidable = require('formidable');
var router = express.Router();
var settings = require('../settings');
var mysql = require('mysql');

router.get('/', function(req, res, next) {
  res.json({ name: 'POSTしてください' });
});

function insert(connection, res, value) {
  console.log("hoge");
  var query = "insert into aitalk.dialy (image, temp) values (?,?);";
  connection.query(query, value, function() {
    res.json({"name": "アップロードが完成しました。"});
  });
}

function entry_dialy(res, value) {
  console.log("hage");
  var options = {
    host: settings.host,
    user: settings.user,
    password: settings.password,
    database: settings.db
  };
  var connection = mysql.createConnection(options);
  connection.connect(err => {
    if(err) throw err;
    insert(connection, res, value);
  });
};

router.post('/', function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    files.image.path = settings.images_dir + files.image.name
    var value = [
      files.image.name,
      fields.temperature
    ]
    entry_dialy(res, value);
  });
});
module.exports = router;
