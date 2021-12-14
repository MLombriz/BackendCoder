const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    prefix: {
        type: String,
        required: false
    },
    telephone: {
        type: Number,
        required: false
    },
    avatar: {
        type: String,
        required: false
    }

})
//Metodos Schema
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('users', userSchema)