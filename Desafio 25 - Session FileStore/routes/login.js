const express = require("express");
const session = require('express-session')
const router = express.Router();
const jwt = require("jsonwebtoken");
const settings = require("../constants/constants");
const users = [
    {
        username: "root",
        password: "rootpasword",
        role: "owner",
        admin: true,
    },
    {
        username: "guest",
        password: "guestpasword",
        role: "customer",
        admin: false,
    },
];

const findUser = (user, req, res) => {
    const userExist = users.filter((u) => u.username === user) //&& u.password === password;
    if (userExist.length == 1) {
        res.redirect('/home')
    } else {
        res.redirect('/password-invalid')
    }
}

module.exports = { router, findUser };