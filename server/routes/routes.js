let express = require('express');
let router = express.Router();

let UserRouter = require('../api/users/route');

router.use('/users', UserRouter);

module.exports = router;
