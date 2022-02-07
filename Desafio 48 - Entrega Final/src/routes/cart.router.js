const express = require('express')
const router = express.Router()
const CartController = require('../controller/cart.controller')

class CartRouter {

    constructor() {
        this.cartController = new CartController
    }

    start() {
        router.get("/", this.cartController.read)
        router.get("/:id", this.cartController.add)
        // router.get("/make-order", this.cartController.make)
        router.delete("/", this.cartController.deleteCart)

        return router
    }
}

module.exports = CartRouter