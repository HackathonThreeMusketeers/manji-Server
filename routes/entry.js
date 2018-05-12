var express = require('express');
var formidable = require('formidable');
var router = express.Router();
var settings = require('../settings');
var mysql = require('mysql');

router.get('/', function(req, res, next) {
  res.json({ name: 'POSTしてください' });
});

function insert(connection, res, value) {
  console.log(value);
  var query = "insert into diary (image, temperature) values (?,?);";
  connection.query(query, value, function() {
    res.json({"name": "アップロードが完成しました。"});
  });
}

function entry_dialy(res, value) {
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
  form.on('fileBegin', function(name, file) {
    file.name = Math.random().toString(36).slice(-8) + ".png";
    file.path = settings.images_dir + file.name;
  });
  form.parse(req, function(err, fields, files) {
    var value = [
      files.image.name,
      fields.temperature
    ]
    entry_dialy(res, value);
  });
});
module.exports = router;
