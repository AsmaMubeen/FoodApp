let jwt = require('jsonwebtoken');
let config = require('./../config/config');
let keyForPasswordEncryption = "FoodApp2021@hfrhgihrgj";
var Cryptr = require('cryptr')
const cryptr = new Cryptr(keyForPasswordEncryption);

let generateJWTForUser = (_id, username) => {
    return jwt.sign({ _id, username }, config.jwt.secret, config.jwt.options);
}

let decodeJWTForUser = (token) => {
    return jwt.verify(token, config.jwt.secret);
}

let encryptPassword = (password) => {
    return cryptr.encrypt(password);
}

let decryptPassword = (encryptedPassword) => {
    return cryptr.decrypt(encryptedPassword);
}

let getToFixedNumber = (num, digits) => {
    return Number(num.toFixed(digits))
}

module.exports = {
    generateJWTForUser,
    decodeJWTForUser,
    encryptPassword,
    decryptPassword,
    getToFixedNumber
}