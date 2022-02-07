const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cart = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: false
    },
    items: {
        type: Array,
        required: false
    },
    shippingAddress: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Cart', Cart)