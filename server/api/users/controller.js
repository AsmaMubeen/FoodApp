let mongoose = require('mongoose');
let ObjectID = mongoose.Types.ObjectId;
let UserModel = require('./model');
let utils = require('../../common/utils');
let helpers = require('../../common/helpers');

let addUser = async (req, res) => {
    try {
        let body = req.body;
        if (!body.username) throw "username is required."
        else if (!body.firstName) throw "firstName is required."
        else if (!body.lastName) throw "lastName is required."
        else if (!body.email || !helpers.isValidEmail(body.email)) throw "Invalid email."
        else if (!body.password) throw "Invalid password."
        else {
            body.email = body.email.toLowerCase()
            body.username = body.username.toLowerCase()
            let [userWithEmail, userWithName] = await Promise.all([
                UserModel.findOne({ email: body.email }).lean().exec(),
                UserModel.findOne({ username: body.username }).lean().exec()
            ])
            if (userWithEmail) {
                throw "User already exists with this email."
            } else if (userWithName) {
                throw "User already exists with this username."
            } else {
                body.password = utils.encryptPassword(body.password);
                let user = await UserModel.create(body)
                user = user.toJSON()
                delete user.password
                res.status(200).json({
                    status: true,
                    message: "Successfully added user.",
                    data: user
                })
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: false, message: String(error) });
    }
};

let login = async (req, res) => {
    try {
        let body = req.body;
        if (!body.username) throw "username is required."
        else if (!body.password) throw "password is required."
        else {
            let user = await UserModel.findOne({ username: body.username.toLowerCase() }).lean()
            if (!user) {
                throw "User not found."
            } else {
                if (body.password == utils.decryptPassword(user.password)) {
                    user.token = await utils.generateJWTForUser(user._id, user.username);
                    delete user.password
                    res.status(200).json({ status: true, message: "Logged in successfully.", data: user });
                } else {
                    throw "Invalid password."
                }
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: false, message: String(error) });
    }
}

module.exports = {
    addUser,
    login
}
