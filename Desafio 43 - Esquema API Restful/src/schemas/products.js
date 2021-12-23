const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true,
        default: 1
    }
})

module.exports = mongoose.model('products', productSchema)