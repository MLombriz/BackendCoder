const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const facebookUserSchema = new Schema({
    name: String,
    provider: String,
    provider_id: { type: String, unique: true },
    photo: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('facebookUsers', facebookUserSchema)