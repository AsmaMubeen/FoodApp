let mongoose = require('mongoose')
let ObjectID = mongoose.Schema.ObjectId;
let constants = require('./../../common/constants');

let NutritionSchema = new mongoose.Schema({
    nutrient: { type: String, required: true },
    value: { type: Number, required: true },
    unit: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
})

let Schema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, enum: constants.productTypes },
    imageUrl: { type: String, required: true },
    price: { type: String, required: true },
    details: { type: String, required: true },
    restaurant: { type: ObjectID, ref: "restaurant", required: true },
    nutrition: [
        NutritionSchema
    ]
}, {
    timestamps: true,
    versionKey: false
});

Schema.index({ name: 1, restaurant: 1 }, { unique: true })

let Model = mongoose.model('product', Schema);

module.exports = Model;
