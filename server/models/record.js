const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
    id: Number,
    ip: String,
    mode: Number,
    time: {type: Date, default: Date.now},
    gas: Number,
    co2: Number,
    tvoc: Number,
    temp: Number,
    humidity: Number,
    lon: Number,
    lat: Number
});

module.exports = mongoose.model('Record', recordSchema);