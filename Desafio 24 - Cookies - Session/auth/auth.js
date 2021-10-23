exports.auth = function (req, res, next) {
    if (!req.session.user) {
        console.log("USER isn't logged in.")
        return res.status(403).send('Access or action denied, please log in');
    } else {
        next();
    }
}