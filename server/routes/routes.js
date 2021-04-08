let express = require('express');
let router = express.Router();

let UserRouter = require('../api/users/route');
let RestaurantRouter = require("../api/restaurants/route");
let ProductRouter = require("../api/products/route");
let RatingRouter = require("../api/ratings/route");
let FavouriteRouter = require("../api/favourites/route");

router.use('/users', UserRouter);
router.use('/restaurants', RestaurantRouter);
router.use('/products', ProductRouter);
router.use('/ratings', RatingRouter);
router.use('/favourites', FavouriteRouter);

module.exports = router;
