let express = require('express');

let router = express.Router();

let authMiddleware = require('./../middlewares/auth');

let Controller = require('./controller');

let validationsMiddleware = require('../middlewares/validations');

router.post(
    '/addUser',
    validationsMiddleware.requiresBody,
    Controller.addUser
);

router.post(
    '/login',
    validationsMiddleware.requiresBody,
    Controller.login
);

module.exports = router;