let mongoose = require('mongoose')
// let ObjectID = mongoose.Schema.ObjectId;
// let constants = require('./../../../common/constants');

let Schema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    imageUrl: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
});

let Model = mongoose.model('restaurant', Schema);

module.exports = Model;
