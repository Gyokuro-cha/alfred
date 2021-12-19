const mongoose = require('mongoose');


const profileSchema = mongoose.Schema({
    userID: {type: String, 
            require: true, 
            unique: true},
    streak: {type: Number, 
            require: false},
    title: {type: String, 
            enum: ['Journey Man', 'Rising Star', 'A Determined Path', 'Destiny Shaper', 'Enlighted'], 
            require: true},
    lastCheckIn: {type: Date, 
            default: Date.now},
    creationDate: {type: Date, 
            default: Date.now}
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;