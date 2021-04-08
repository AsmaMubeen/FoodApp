let mongoose = require('mongoose');
let ObjectID = mongoose.Types.ObjectId;
let ProductModel = require('./model');

let add = (req, res) => {
    try {
        let body = req.body;
        if (!body.name) throw "name is required."
        else if (!body.type) throw "type is required."
        else if (!body.imageUrl) throw "imageUrl is required."
        else if (!body.price) throw "price is required."
        else if (!body.details) throw "details is required."
        else if (!body.restaurant) throw "restaurant is required."
        else {
            if (body.nutrition) {
                for (let nutritionDetails of body.nutrition) {
                    if (!nutritionDetails.nutrient) throw "nutrient is required"
                    if (!nutritionDetails.value) throw "value is required"
                    if (!nutritionDetails.unit) throw "unit is required"
                }
                if (body.nutrition.length != Array.from(new Set(body.nutrition.map(x => nutrient)))) {
                    throw "Duplicate values found"
                }
            }
            let productWithName = await ProductModel.findOne({ name: body.name, restaurant: body.restaurant }).lean().exec()
            if (productWithName) {
                throw "Product already exists with this name under this restaurant."
            } else {
                let product = await ProductModel.create(body)
                res.status(200).json({
                    status: true,
                    message: "Successfully added product.",
                    data: product
                })
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: false, message: String(error) });
    }
}

// list products by type
// get product

module.exports = {
    add
}