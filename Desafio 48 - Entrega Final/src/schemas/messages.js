const mongoose = require('mongoose')
const user = require('./user')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    mail: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        default: 'User'
    }
})

module.exports = mongoose.model('messages', messageSchema)