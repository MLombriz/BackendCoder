// Importo Routers
const routerProductos = require('./routes/ProductRouter')
// const routerCarrito = require('./routes/CartRouter')
const constant = require('./constants/constants')

const express = require('express')
const app = express()
const server = require('http').Server(app)
app.use('/productos', routerProductos)

app.use(express.static('public'))


app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

server.listen(constant.PORT, err => {
    if (err) throw new Error(`Error en el servidor ${err}`)
    console.log(`Servidor inicializado en localhost:${server.address().port}`)
})


// INFO
// SELECCIONO LA BASE DE DATOS A UTILIZAR EN PRODUCTROUTER.JS