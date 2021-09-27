const fs = require('fs')
const express = require('express')
const routerProductos = express.Router()
module.exports = routerProductos;
routerProductos.get('/', (req, res) => {
    res.sendFile(__path.resolve(__dirname + '/public/index.html'))
})

const { deleteOneProduct, findOneProduct, addProduct, updateOneProduct, listAllProducts } = require('../controllers/products');
const { addMessage } = require('../controllers/messages')
const isAdmin = true

// RUTAS PRODUCTOS
// Lito TODOS los productos de la Base de Datos
routerProductos.get('/listFromDataBase', listAllProducts)
// Listo UN producto de la Base de Datos
routerProductos.get('/fromDataBase/:id', findOneProduct)
// Agrego UN producto a la Base de Datos
routerProductos.post('/addToDataBaseProduct', addProduct)
// Actualizo UN producto de la Base de Datos //VER SI FUNCIONA
routerProductos.put('/update/:id', updateOneProduct)
// Borro UN producto de la Base de Datos
routerProductos.delete('/fromDataBase/:id', deleteOneProduct)

// Cargo UN mensaje en la Base de Datos 
routerProductos.post('/mensajes/save', addMessage)


