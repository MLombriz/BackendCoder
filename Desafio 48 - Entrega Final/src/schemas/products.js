const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true
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
        required: false,
    },
    picture: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 1
    },
    qty: {
        type: Number,
        required: true,
        default: 1
    }
})


module.exports = mongoose.model('products', productSchema)