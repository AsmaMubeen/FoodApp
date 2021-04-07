let mongoose = require('mongoose')
let ObjectID = mongoose.Schema.ObjectId;

let Schema = new mongoose.Schema({
    user: { type: ObjectID, ref: "user", required: true },
    product: { type: ObjectID, ref: "product", required: true },
    rating: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: false
});

let Model = mongoose.model('rating', Schema);

module.exports = Model;
