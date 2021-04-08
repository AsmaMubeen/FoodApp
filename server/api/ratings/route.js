let express = require('express');

let router = express.Router();

let authMiddleware = require('./../middlewares/auth');

let Controller = require('./controller');

let validationsMiddleware = require('../middlewares/validations');

router.post(
    '/add',
    authMiddleware.isUserLogin,
    validationsMiddleware.requiresBody,
    Controller.add
);

module.exports = router;