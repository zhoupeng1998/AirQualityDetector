var express = require('express');
var sd = require('silly-datetime');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Device = require('./models/device');
var Record = require('./models/record');

//var url = "mongodb://localhost:27017/detector";
var url = "mongodb://13.57.9.33:27017/detector"
mongoose.connect(url, {useNewUrlParser: true});

var app = express();

const getFilter = (query) => {
    var filter = {};
    // filter time
    if (query.week == '10') {
        filter['time'] = {$gte: '2019-12-02'};
    } else if (query.week == '9') {
        filter['time'] = {$lte: '2019-12-01'};
    }
    // filter mode
    if (query.mode == '0' || query.mode == '1') {
        filter['mode'] = query.mode;
    }
    // filter location
    if (query.location == 'on') {
        filter['lon'] = {$gt: -11751, $lt: -11750};
        filter['lat'] = {$gt: 3338, $lt: 3339.1};
    } else if (query.location == 'off') {
        filter['$or'] = [{lon: {$lte: -11751}}, {lon: {$gte: 11750}}, 
            {lat: {$lte: 3338}}, {lat: {$gte: 3339.1}}];
    }
    return filter;
};

const getAverage = (array) => {
    var sum = 0.0;
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] != null) {
            sum += array[i];
            count += 1;
        }
    }
    return String(sum / count);
};

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

app.get('/raw', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Record.find(getFilter(req.query)).sort({time:-1}).exec((err, entry) => {
        res.json(entry);
    });
});

app.get('/latest', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Record.find().sort({time:-1}).limit(1).exec((err, entry) => {
        var result = JSON.parse(JSON.stringify(entry));
        result[0].time_str = sd.format(result[0].time, "YYYY-MM-DD HH:mm:ss");
        res.json(result);
    });
})

app.get('/record', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Record.find(getFilter(req.query)).sort({time:-1}).limit(Number(req.query.limit)).exec((err, entry) => {
        if (err) {
            return console.err(err);
        }
        timeline = new Array();
        humidity_a = new Array();
        temperature_a = new Array();
        gas_a = new Array();
        co2_a = new Array();
        tvoc_a = new Array();
        entry.forEach(obj => {
            timeline.push(sd.format(obj.time, "YYYY-MM-DD HH:mm:ss"));
            humidity_a.push(obj.humidity);
            temperature_a.push(obj.temp);
            gas_a.push(obj.gas);
            co2_a.push(obj.co2);
            tvoc_a.push(obj.tvoc);
        })
        res.json({time: timeline, humidity: humidity_a, temperature: temperature_a, 
            gas: gas_a, co2: co2_a, tvoc: tvoc_a, 
            avg_humidity: getAverage(humidity_a),
            avg_temperature: getAverage(temperature_a),
            avg_gas: getAverage(gas_a),
            avg_co2: getAverage(co2_a),
            avg_tvoc: getAverage(tvoc_a)
        });
    });
});

app.get('/portal', (req, res, next) => {
    // Find number of devices (for new device id use)
    Device.count((err, cnt) => {
        // Find device id from db and insert records value
        // Add device id to db if not found
        Device.find({'mac':req.query.mac}).limit(1).exec().then((entry) => {
            var deviceId = cnt + 1;
            if (entry.length == 0) {
                var newDevice = new Device({id:deviceId, mac:req.query.mac});
                newDevice.save();
            } else {
                deviceId = entry[0].id;
            }
            // insert reading data to db
            const time = new Date();
            var data = new Record({
                id: deviceId,
                ip: req.ip,
                mode: req.query.mode,
                gas: req.query.gas,
                co2: req.query.co2,
                tvoc: req.query.tvoc,
                temp: req.query.temp,
                humidity: req.query.humidity,
                lon: req.query.lon,
                lat: req.query.lat
            });
            console.log(JSON.stringify(data));
            data.save();
        });
    });

    res.send(JSON.stringify(req.query));
});

app.get('/clean', (req, res, next) => {
    Record.deleteMany({'tvoc': {$gte: 1000}}).exec((err, entry) => {
        res.json(entry);
    });
});

app.listen(8080);
