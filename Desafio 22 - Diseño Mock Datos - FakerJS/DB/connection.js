
const mongoose = require('mongoose')
const ConnectionToDataBase = async () => {
    try {
        await mongoose.connect("mongodb+srv://mlabo:mlabo@cluster0.mmjbd.mongodb.net/ecommerce", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database Connected")
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}

module.exports = ConnectionToDataBase;