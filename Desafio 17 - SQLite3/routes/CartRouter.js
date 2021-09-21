const fs = require('fs')
const express = require('express')
const routerCarrito = express.Router()
module.exports = routerCarrito;

routerCarrito.get('/', (req, res) => {
    res.sendFile(__path.resolve(__dirname + '/public/cart/cart.html'))
})

// RUTAS PRODUCTOS
routerCarrito.get('/listar', (req, res) => {
    try {
        fs.promises.readFile('../Json/Carrito.json').then(data => data.toString('utf-8')).then(datos => {
            const carrito = JSON.parse(datos)
            if (carrito.length == 0) {
                res.json({ error: 'No hay productos cargados' })
            } else {
                res.json({
                    items: carrito,
                    cantidad: carrito.length
                })
            }
        })
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
})
routerCarrito.get('/listar/:id', (req, res) => {
    try {
        fs.promises.readFile('../Json/Carrito.json').then(data => data.toString('utf-8')).then(datos => {
            const carrito = JSON.parse(datos)
            const id = req.params.id
            if (id > carrito.length) {
                res.json({ error: `Producto No encontrado, se dispone unicamente de ${carrito.length} productos` })
            }
            else {
                const newCarrito = carrito.filter(function (e) {
                    return e.id == id
                })
                res.json({
                    item: newCarrito
                })
            }
        })
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
        //console.log('Error en /api/productos/listar/:id', error)
    }
})

routerCarrito.post('/agregar/:id_producto', (req, res) => {
    try {
        fs.promises.readFile('../Json/Productos.json').then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            const id_producto = req.params.id_producto
            const producto = productos.filter(function (e) {
                return e.id == id_producto
            })
            try {
                fs.promises.readFile('../Json/Carrito.json').then(dataCart => dataCart.toString('utf-8')).then(datosCart => {
                    const carrito = JSON.parse(datosCart)
                    const maxId = carrito.reduce((acc, curr) => curr.id < acc.id ? acc.id : curr.id) //busco el maximo ID
                    const itemCartNuevo = {
                        id: maxId + 1, timestamp: Date.now(), producto: producto
                    }
                    carrito.push(itemCartNuevo)
                    fs.promises.writeFile('../Json/Carrito.json', JSON.stringify(carrito, null, '\t'))
                    console.log('Producto agregado con exito...')
                    res.redirect('/')
                })
            } catch (err) {
                throw new Error(`Error en el servidor ${err}`)
            }
        })
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
})
routerCarrito.delete('/borrar/:id', (req, res) => {
    try {
        fs.promises.readFile('../Json/Carrito.json').then(data => data.toString('utf-8')).then(datos => {
            const carrito = JSON.parse(datos)
            const id = req.params.id
            if (id > carrito.length) {
                res.json({ error: `Producto No encontrado, se dispone unicamente de ${carrito.length} productos` })
            }
            else {
                const newCarrito = carrito.filter(function (e) {
                    return e.id != id
                })
                fs.promises.writeFile('../Json/Carrito.json', JSON.stringify(newCarrito, null, '\t'))
                console.log('Item Borrado del Carrito con exito...')
                res.redirect('/')
            }
        })
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
})

