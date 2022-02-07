const express = require('express')
const router = express.Router()
const OrderController = require('../controller/order.controller')

class OrderRouter {

    constructor() {
        this.orderController = new OrderController
    }

    start() {
        router.get("/", this.orderController.read)
        return router
    }
}

module.exports = OrderRouter