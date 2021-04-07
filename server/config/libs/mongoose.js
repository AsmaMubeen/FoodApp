let mongoose = require('mongoose');
let config = require('../config');
let chalk = require('chalk');

mongoose.connect(config.db.mongo.uri, config.db.mongo.options, function (err) {
    if (err) {
        console.log(chalk.red("Error while connecting to mongo : " + err));
        process.exit(1);
    } else {
        console.log("connected to mongodb : " + config.db.mongo.uri);
    }
});

module.exports = mongoose;