const express = require("express");
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

var auth = function (req, res, next) {
    if (!req.user) {
        console.log("USER isn't logged in.")
        return res.status(403).send('Access or action denied, please log in');
    }
    next();
}

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => {
        return u.username === username && u.password === password;
    });
    if (user) {
        const accessToken = jwt.sign(
            { username: user.username, role: user.role },
            process.env.PRIVATE_KEY || settings.PRIVATE_KEY,
            { expiresIn: "120m" }
        );
        req.session.user = user.username; //Me guardo en session username y role
        req.session.role = user.role;
        res.json({ accessToken });
    } else {
        res.send("wrong username or password");
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) res.send('Logout Ok!!')
        else res.send({ status: 'Logout ERROR', body: err })
    })
})
module.exports = router;