// Importo Routers
const routerProductos = require('./routes/ProductRouter')
const routerCarrito = require('./routes/CartRouter')
const ConnectionToDataBase = require('./DB/connection')

const express = require('express')
const fs = require('fs')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)


ConnectionToDataBase()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

app.use('/productos', routerProductos)
app.use('/carrito', routerCarrito)
app.use(express.static('public'))

const PORT = 8080
server.listen(PORT, err => {
    if (err) throw new Error(`Error en el servidor ${err}`)
    console.log(`Servidor inicializado en localhost:${server.address().port}`)
})


// WEBSOCKET
io.on('connection', (socket) => {
    try {
        //PRODUCTOS CARGADOS
        fs.promises.readFile('../Json/Productos.json').then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            console.log(`Cliente nuevo Conectado ID: ${socket.id}`)
            socket.emit('productos', productos) //primer conexion ya le muestra los articulos cargados por todos los usuarios

            socket.on('item', (data) => {
                const maxId = productos.reduce((acc, curr) => curr.id < acc.id ? acc.id : curr.id) //busco el maximo ID
                const productoNuevo = { ...data, id: maxId + 1 }
                productos.push(productoNuevo)
                try {
                    fs.promises.writeFile('../Json/Productos.json', JSON.stringify(productos, null, '\t'))
                    io.emit('productos', productos) //le actualizo a TODOS los productos listados
                } catch (err) {
                    throw new Error(`Error en el servidor ${err}`)
                }
            })

            socket.on('deleteProd', (id) => {
                const newProductos = productos.filter(function (e) {
                    return e.id != id
                })
                try {
                    fs.promises.writeFile('../Json/Productos.json', JSON.stringify(newProductos, null, '\t'))
                    io.emit('productos', newProductos)
                } catch (err) {
                    throw new Error(`Error en el servidor ${err}`)
                }
            })

        })
        // MENSAJES EN CHAT
        try {
            fs.promises.readFile('../Json/Mensajes.json').then(data => data.toString('utf-8')).then(datos => {
                const mensajes = JSON.parse(datos)
                socket.emit('chat', mensajes)

                socket.on('new-message', (data) => {
                    const mensajeNuevo = { ...data, id: mensajes.length + 1 }
                    mensajes.push(mensajeNuevo)
                    try {
                        fs.promises.writeFile('../Json/Mensajes.json', JSON.stringify(mensajes, null, '\t'))
                        io.emit('chat', mensajes) //le actualizo a TODOS los mensajes listados
                    } catch (err) {
                        throw new Error(`Error en el servidor ${err}`)
                    }
                })
            })
        } catch (err) {
            throw new Error(`Error en el servidor ${err}`)
        }
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }

})
