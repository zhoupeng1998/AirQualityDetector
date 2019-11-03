var express = require('express');
var sd = require('silly-datetime');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Device = require('./models/device');
var Record = require('./models/record');

var url = "mongodb://localhost:27017/detector";
mongoose.connect(url, {useNewUrlParser: true});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/device', (req, res, next) => {
    Device.find((err, entry) => {
        if (err) {
            return console.error(err);
        }
        res.json(entry);
    });
});

app.get('/record', (req, res, next) => {
    Record.find((err, entry) => {
        if (err) {
            return console.error(err);
        }
        res.json(entry);
    })
});

app.get('/portal', (req, res, next) => {
    console.log(req.query);

    // Find max device number (for new device id use)
    Device.find().sort({id:-1}).limit(1).exec().then((maxDevice) => {
        var newId = 0;
        if (maxDevice.length == 0) {
            var firstDevice = new Device({id:0, mac:"FF:FF:FF:FF:FF:FF"});
            firstDevice.save();
        } else {
            newId = maxDevice[0].id;
        }
        // Find device id from db and insert records value
        // Add device to db if not found
        Device.find({'mac':req.query.mac}).limit(1).exec().then((entry) => {
            var deviceId = newId + 1;
            if (entry.length == 0) {
                var newDevice = new Device({id:deviceId, mac:req.query.mac});
                newDevice.save();
            } else {
                deviceId = entry.query.id;
            }
            // insert reading data to db
            var data = new Record({
                id: deviceId,
                ip: req.ip,
                time: sd.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
                gas: req.query.gas,
                co2: req.query.co2,
                tvoc: req.query.tvoc,
                temp: req.query.temp,
                Humidity: req.query.humidity
            });
            data.save();
        });
    });

    res.send(JSON.stringify(req.query));
});

app.listen(3000);
