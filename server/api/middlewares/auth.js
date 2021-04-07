let UserModel = require('../users/model');
let utils = require('../../common/utils');

let isUserLogin = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        if (token) {
            let decodedData;
            try {
                decodedData = utils.decodeJWTForUser(token);
            } catch (err) {
                throw "Invalid token."
            }
            let user = await UserModel.findOne({ _id: decodedData._id })
            console.log(decodedData)
            if (user) {
                req.jwt = decodedData;
                req.jwt.email = user.email;
                next();
            } else {
                throw "User not found."
            }
        } else {
            throw "User token not found."
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({
            status: false,
            message: String(error)
        })
    }
}

module.exports = {
    isUserLogin
}
