const mongoose = require('mongoose');


const profileSchema = mongoose.Schema({
    userID: {type: String, require: true, unique: true},
    streak: {type: Number, require: false},
    title: {type: String, require: false},
    lastCheckIn: {type: Date, default: Date.now},
    creationDate: {type: Date, default: Date.now}
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;