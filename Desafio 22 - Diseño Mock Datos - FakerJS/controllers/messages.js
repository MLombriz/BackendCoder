const messageSchema = require('../schemas/messages')

const addMessage = async (req, res) => {
    const { mail, message } = req.body
    if (!mail || !message) {
        res.json({ message: "The message needs a mail and message" })
    } else {
        const newMessage = new messageSchema(req.body)
        await newMessage.save()
        res.json({ message: "Message Saved" })
    }
}
module.exports = { addMessage }