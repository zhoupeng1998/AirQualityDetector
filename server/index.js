var express = require('express');
var sd = require('silly-datetime');
var {mongoose, Record} = require("./model");

var app = express();

app.get('/', function(req, res, next) {
    Record.find((err, entry) => {
        if (err) {
            return console.error(err);
        }
        res.json(entry);
    })
});

app.get('/portal', function(req, res, next) {
    var data = {
        ip: req.ip,
        time: sd.format(new Date(), "YYYY-MM-DD HH:mm:ss")
    };
    var addRecord = new Record(data);
    addRecord.save();
    res.send(JSON.stringify(JSON.stringify(data) + "\nRecorded"));
});

app.listen(8080);
