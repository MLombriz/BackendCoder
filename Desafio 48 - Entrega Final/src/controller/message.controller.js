const { filterMessages } = require('../database')
class MessageController {
    chat(req, res) {
        res.render("chat", {
            title: "Chat"
        })
    }

    async chatFilter(req, res) {
        const { email } = req.params
        res.status(200).json(await filterMessages(email))
    }

}

module.exports = MessageController