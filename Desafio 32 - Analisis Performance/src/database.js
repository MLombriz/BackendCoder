const mongoose = require('mongoose')
const { mongodb } = require('./keys')

//Connection
const ConnectionToDataBase = async () => {
    try {
        await mongoose.connect(mongodb.URL, mongodb.advancedOptions)
        console.log('Database is connected')
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}
ConnectionToDataBase()
