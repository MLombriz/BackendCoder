const fs = require('fs')
const express = require('express')
const routerProductos = express.Router()
module.exports = routerProductos;
routerProductos.get('/', (req, res) => {
    res.sendFile(__path.resolve(__dirname + '/public/index.html'))
})

const isAdmin = true

// RUTAS PRODUCTOS
routerProductos.get('/listar', (req, res) => {
    try {
        fs.promises.readFile('../Json/Productos.json').then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            if (productos.length == 0) {
                res.json({ error: 'No hay productos cargados' })
            } else {
                res.json({
                    items: productos,
                    cantidad: productos.length
                })
            }
        })
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
        //console.log('Error en /api/productos/listar', error)
    }
})

routerProductos.get('/listar/:id', (req, res) => {
    try {

        fs.promises.readFile('../Json/Productos.json').then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            const id = req.params.id
            if (id > productos.length) {
                res.json({ error: `Producto No encontrado, se dispone unicamente de ${productos.length} productos` })
            }
            else {
                res.json({
                    item: productos[id - 1]
                })
            }
        })
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
        //console.log('Error en /api/productos/listar/:id', error)
    }
})

routerProductos.post('/agregar', (req, res) => {
    try {
        isAdmin ? (
            fs.promises.readFile('../Json/Productos.json').then(data => data.toString('utf-8')).then(datos => {
                const productos = JSON.parse(datos)
                const maxId = productos.reduce((acc, curr) => curr.id < acc.id ? acc.id : curr.id) //busco el maximo ID
                const productoNuevo = {
                    ...{
                        title: req.body.title, code: req.body.code, description: req.body.description,
                        price: req.body.price, pictureUrl: req.body.pictureUrl, stock: req.body.stock
                    }, id: maxId + 1, timestamp: Date.now()
                }
                productos.push(productoNuevo)
                fs.promises.writeFile('../Json/Productos.json', JSON.stringify(productos, null, '\t'))
                console.log('Producto agregado con exito...')
                res.redirect('/')
            })
        ) : (
            res.json({ error: -1, descripcion: 'ruta /productos/agregar solo apta Administradores' })
        )
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
        //console.log('Error en /api/productos/guardar', error)
    }
})
routerProductos.put('/actualizar/:id', (req, res) => {
    try {
        isAdmin ? (
            fs.promises.readFile('../Json/Productos.json').then(data => data.toString('utf-8')).then(datos => {
                const productos = JSON.parse(datos)
                const maxId = productos.reduce((acc, curr) => curr.id < acc.id ? acc.id : curr.id) //busco el maximo ID
                const id = req.params.id
                if (id > maxId) {
                    res.json({ error: `Producto No encontrado, el id maximo disponible es ${maxId}` })
                }
                else {
                    const productoActualizar = productos[id - 1]
                    const productoActualizado = {
                        title: req.body.title, code: req.body.code, description: req.body.description,
                        price: req.body.price, pictureUrl: req.body.pictureUrl, stock: req.body.stock,
                        id: maxId + 1, timestamp: Date.now()
                    }
                    productos[id - 1] = productoActualizado
                    fs.promises.writeFile('../Json/Productos.json', JSON.stringify(productos, null, '\t'))
                    console.log('Producto Actualizado con exito...')
                    res.json({ productoAnterior: productoActualizar, productoActualizado: productoActualizado })
                }
            })
        ) : (
            res.json({ error: -1, descripcion: 'ruta /mensajes/guardar solo apta Administradores' })
        )
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
        //console.log('Error en /api/productos/actualizar', error)
    }
})
routerProductos.delete('/borrar/:id', (req, res) => {
    try {
        isAdmin ? (
            fs.promises.readFile('../Json/Productos.json').then(data => data.toString('utf-8')).then(datos => {
                const productos = JSON.parse(datos)
                const id = req.params.id
                if (id > productos.length) {
                    res.json({ error: `Producto No encontrado, se dispone unicamente de ${productos.length} productos` })
                }
                else {
                    const newProductos = productos.filter(function (e) {
                        return e.id != id
                    })
                    fs.promises.writeFile('../Json/Productos.json', JSON.stringify(newProductos, null, '\t'))
                    console.log('Producto Borrado con exito...')
                    res.redirect('/')
                }
            })
        ) : (
            res.json({ error: -1, descripcion: 'ruta /productos/borrar solo apta Administradores' })
        )
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
})
routerProductos.post('/mensajes/guardar', (req, res) => {
    try {
        fs.promises.readFile('../Json/Mensajes.json').then(data => data.toString('utf-8')).then(datos => {
            const mensajes = JSON.parse(datos)
            const mensajeNuevo = { ...{ title: req.body.mail, price: req.body.message }, id: mensajes.length + 1 }
            mensajes.push(mensajeNuevo)
            fs.promises.writeFile('../Json/Mensajes.json', JSON.stringify(mensajes, null, '\t'))
            res.redirect('/')
        })

    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
        //console.log('Error en /api/productos/guardar', error)
    }
})


