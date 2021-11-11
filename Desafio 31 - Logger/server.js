const express = require("express")
const app = express()
const port = 5500
const compression = require("compression")
const logger = require('./logger/index')

app.use(compression())


app.get("/info", (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, RESPONSE: Sucess`)
    res.status(200).json({ msg: "ok info section acess info", server: 1 })
})

app.get("/randoms", (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, RESPONSE: Sucess`)
    res.status(200).json({ msg: "ok info section acess randoms", server: 1 })
})
app.listen(port, () => {

    console.log(`Server running at http://localhost:${port}`)
})

