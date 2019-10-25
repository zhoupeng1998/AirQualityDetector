var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/test0";
mongoose.connect(url, {useNewUrlParser: true});

var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'Connection error'));
connection.once('open', () => {
    console.log("Mongodb Connected");
});

var recordSchema = new mongoose.Schema({
    ip: String,
    time: String
});

var Record = mongoose.model('Record', recordSchema);

module.exports = {mongoose, Record}