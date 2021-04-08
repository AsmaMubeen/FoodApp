let mongoose = require('mongoose');
let ObjectID = mongoose.Schema.ObjectId;

let Schema = new mongoose.Schema({
    user: { type: ObjectID, ref: "user", required: true },
    product: { type: ObjectID, ref: "product", required: true },
}, {
    timestamps: true,
    versionKey: false
});

Schema.index({ user: 1, product: 1 }, { unique: true })

let Model = mongoose.model('favourites', Schema);

module.exports = Model;
