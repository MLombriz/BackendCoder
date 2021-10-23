const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    password: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)