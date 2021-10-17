const express = require('express')
const routerMessages = express.Router();
const database = require('../databases/1-filesystem/filesystem');
routerMessages.get("/messages", (req, res) => {
    const database = req.app.get("dataHandler");
    const myPromise = new Promise((resolve, reject) => {
        resolve(database.getMessages());
    });
    myPromise
        .then((result) => {
            result.length === 0
                ? res.json({ error: "there is not messages" })
                : res.json({ messages: result });
        })
        .catch((error) => res.json(error));
});

routerMessages.post("/messages", (req, res) => {
    //const database = req.app.get("dataHandler");
    const message = req.body;
    const myPromise = new Promise((resolve, reject) => {
        resolve(database.addMessages(message));
    });
    myPromise
        .then(() => {
            res.json({ message: "message uploaded" });
        })
        .catch((error) => res.json(error));
});

module.exports = routerMessages;