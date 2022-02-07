const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Message = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    opinion: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Message', Message)