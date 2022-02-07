const { msgs } = require('../keys')
const { makeOrder } = require('../database')
class OrderController {

    async read(req, res) {
        try {
            res.status(200).json(await makeOrder(req.user.email))
        }
        catch (err) {
            console.error(msgs.error, err)
        }
    }

}

module.exports = OrderController