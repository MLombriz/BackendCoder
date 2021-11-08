const express = require("express")
const app = express()
const port = 8081


app.get("/info", (req, res) => {
    res.status(200).json({ msg: "ok info section acess info", server: 1 })
})

app.get("/randoms", (req, res) => {
    res.status(200).json({ msg: "ok info section acess randoms", server: 1 })
})
app.listen(port, () => {

    console.log(`Server running at http://localhost:${port}`)
})

