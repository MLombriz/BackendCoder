
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: false
    },
    fromCart: {
        type: String,
        required: false
    },
    shippingAddress: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Order', Order)