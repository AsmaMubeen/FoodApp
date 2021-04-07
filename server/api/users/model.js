let mongoose = require('mongoose')
let autoIncrement = require('mongoose-auto-increment');
// let ObjectID = mongoose.Schema.ObjectId;
// let constants = require('./../../../common/constants');

let Schema = new mongoose.Schema({
    username: {type: String, unique:true, required: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false
});

autoIncrement.initialize(mongoose.connection);

Schema.plugin(autoIncrement.plugin, { model: 'users', field: 'id', startAt: 1, incrementBy: 1 });

let Model = mongoose.model('user', Schema);

module.exports = Model;
