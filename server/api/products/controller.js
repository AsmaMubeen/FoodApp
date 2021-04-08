let mongoose = require('mongoose');
let ObjectID = mongoose.Types.ObjectId;
let ProductModel = require('./model');
let FavouritesModel = require("../favourites/model")
let RatingsModel = require("../ratings/model")

let add = async (req, res) => {
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
                let nutrients = Array.from(new Set(body.nutrition.map(x => x.nutrient)))
                if (body.nutrition.length != nutrients.length) {
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
let productsList = async (req, res) => {
    try {
        let userId = req.jwt._id
        let filter = {}
        let query = req.query
        if (query) {
            let productType = query.productType
            if (productType) {
                filter.type = productType
            }
        }
        let [products, count] = await Promise.all([
            ProductModel.find(filter).populate("restaurant").lean().exec(),
            ProductModel.countDocuments(filter)
        ])
        for (let product of products) {
            let [ratings, favourite] = await Promise.all([
                RatingsModel.find({ product: product._id }).lean(),
                FavouritesModel.findOne({ user: userId, product: product._id }).lean()
            ])
            let sumOfRatings = ratings.map(x => x.rating).reduce((a, b) => a + b, 0)
            product.averageRating = sumOfRatings / ratings.length
            product.favourite = favourite
        }
        res.status(200).json({
            status: true,
            message: "Successfully fetched products.",
            count: count,
            data: products
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: false, message: String(error) });
    }
}


// get product
let getProduct = async (req, res) => {
    try {
        let _id = req.params._id
        let userId = req.jwt._id
        let [product, favourite] = await Promise.all([
            ProductModel.findOne({ _id: _id }).populate("restaurant").lean(),
            FavouritesModel.findOne({ user: userId, product: _id }).lean()
        ])
        if (product) {
            if (favourite) {
                product.favourite = favourite
            }
            res.status(200).json({
                status: true,
                message: "Successfully fetched product details.",
                data: product
            })
        } else {
            throw "Product not found"
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: false, message: String(error) });
    }
}

module.exports = {
    add,
    productsList,
    getProduct
}