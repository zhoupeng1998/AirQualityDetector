const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
    id: Number,
    ip: String,
    time: String,
    gas: Number,
    co2: Number,
    tvoc: Number,
    temp: Number,
    humidity: Number
});

module.exports = mongoose.model('Record', recordSchema);