/** @format */

console.clear();

const Client = require("./Structures/Client.js");

const config = require("./Data/config.json");

const mongoose = require("mongoose");

const client = new Client();

mongoose.connect(config.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('DB connection established');
}).catch((_err)=>{
    console.error('an error has occured = ' + _err);
});

client.start(config.token);