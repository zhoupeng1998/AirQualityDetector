const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    id: Number,
    mac: String
});

module.exports = mongoose.model('Device', deviceSchema);