let mongoose = require('mongoose');
let ObjectID = mongoose.Types.ObjectId;
let FavouritesModel = require('./model');

let add = async (req, res) => {
    try {
        let body = req.body;
        if (!body.user) throw "user is required."
        else if (!body.product) throw "product is required."
        else {
            let favourite = await FavouritesModel.findOneAndUpdate({ user: body.user, product: body.product }, { $set: body }, { upsert: true, new: true })
            res.status(200).json({
                status: true,
                message: "Successfully added the product to favourites.",
                data: favourite
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