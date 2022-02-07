const express = require('express')
const router = express.Router()
const MessageController = require('../controller/message.controller')

class MessageRouter {
    constructor() {
        this.messageController = new MessageController
    }

    start() {
        router.get("/:email", this.messageController.chatFilter)
        router.get("/", this.messageController.chat)
        return router
    }
}


module.exports = MessageRouter