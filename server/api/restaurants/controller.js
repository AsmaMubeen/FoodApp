let mongoose = require('mongoose');
let ObjectID = mongoose.Types.ObjectId;
let RestaurantModel = require('./model');

let add = async (req, res) => {
    try {
        let body = req.body;
        if (!body.name) throw "name is required."
        else if (!body.imageUrl) throw "imageUrl is required."
        else {
            let restaurant = await RestaurantModel.findOne({ name: body.name }).lean().exec()
            if (restaurant) {
                throw "Restaurant already exists with this name."
            } else {
                let restaurant = await RestaurantModel.create(body)
                res.status(200).json({
                    status: true,
                    message: "Successfully added restaurant.",
                    data: restaurant
                })
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: false, message: String(error) });
    }
}

module.exports = {
    add
}