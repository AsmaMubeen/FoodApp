let mongoose = require('mongoose');
let ObjectID = mongoose.Types.ObjectId;
let RatingsModel = require('./model');

let add = async (req, res) => {
    try {
        let body = req.body;
        if (!body.user) throw "user is required."
        else if (!body.product) throw "product is required."
        else if (!body.rating) throw "rating is required."
        else {
            let rating = await RatingsModel.create(body)
            res.status(200).json({
                status: true,
                message: "Successfully recorded rating.",
                data: rating
            })
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: false, message: String(error) });
    }
}

module.exports = {
    add
}