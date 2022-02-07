const { readCart, addCart, add, deleteCartItem } = require('../database')

class CartController {
    async read(req, res) {
        res.status(200).json(await readCart(req.user.email))
    }

    async add(req, res) {

        res.status(200).json(await add(req.params.id, req.user.email))
    }
    async addCart(req, res) {
        res.status(200).json(await addCart(req.body))
    }

    async make(req, res) {
        res.status(200).json(await make(req.params.id))
    }

    async deleteCart(req, res) {
        res.status(200).json(await deleteCartItem(req.user.email))
    }

}


module.exports = CartController