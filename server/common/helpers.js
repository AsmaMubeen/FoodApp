"use strict";

let underscore = require("underscore");

let isValidEmail = function (email) {
    return underscore.isString(email) && /^\S+@\S+\.\S+/.test(email);
}

let isValidPhoneNumber = function (phNo) {
    return /[0-9]{10}/.test(phNo);
}

let isValidPasword = function (password) {
    return password.length >= 6;
}

module.exports = {
    isValidEmail,
    isValidPhoneNumber,
    isValidPasword
}
