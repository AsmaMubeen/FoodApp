let express = require('express');

let router = express.Router();

let authMiddleware = require('./../middlewares/auth');

let Controller = require('./controller');

let validationsMiddleware = require('../middlewares/validations');

router.post(
    '/add',
    validationsMiddleware.requiresBody,
    Controller.add
);

router.get(
    "/list",
    authMiddleware.isUserLogin,
    Controller.productsList
);

router.get(
    "/one/:_id",
    authMiddleware.isUserLogin,
    Controller.getProduct
);

module.exports = router;