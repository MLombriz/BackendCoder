// Importo Routers
const routerProductos = require('./routes/ProductRouter')
const routerMessages = require('./routes/MessagesRouter')
const routerCarrito = require('./routes/CartRouter')
const constant = require('./constants/constants')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
app.use('/productos', routerProductos)
app.use('/messages', routerMessages)
app.use('/carrito', routerCarrito)
app.use(express.static('public'))


app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.set("socket.io", io)
server.listen(constant.PORT, err => {
    if (err) throw new Error(`Error en el servidor ${err}`)
    console.log(`Servidor inicializado en localhost:${server.address().port}`)
})

const fs = require('fs')
const dataHandler = require('./databases/1-filesystem/filesystem')
const productFile = './databases/1-filesystem/Json/Productos.json'

io.on("connection", (socket) => {
    try {
        //PRODUCTOS CARGADOS
        fs.promises.readFile(productFile).then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            console.log(`Cliente nuevo Conectado ID: ${socket.id}`)
            socket.emit('productos', productos) //primer conexion ya le muestra los articulos cargados por todos los usuarios

            socket.on('item', (data) => {
                const maxId = productos.reduce((acc, curr) => curr.id < acc.id ? acc.id : curr.id) //busco el maximo ID
                const productoNuevo = { ...data, id: maxId + 1 }
                productos.push(productoNuevo)
                fs.promises.writeFile(productFile, JSON.stringify(productos, null, '\t'))
                io.emit('productos', productos) //le actualizo a TODOS los productos listados
            })

            socket.on('deleteProd', (id) => {
                const newProductos = productos.filter(function (e) {
                    return e.id != id
                })
                fs.promises.writeFile(productFile, JSON.stringify(newProductos, null, '\t'))
                io.emit('productos', newProductos)
            })

            console.log(`connection_identifier: ${socket.id}`);
            try {
                dataHandler
                    .getMessages()
                    .then((rows) => {
                        io.emit("messages", rows);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            } catch (error) {
                console.log('Error en server.js con dataHandler', error);
            }
            socket.on("new-message", (message) => {
                try {
                    dataHandler.addMessages({ ...message });
                    dataHandler
                        .getMessages()
                        .then((rows) => {
                            io.emit("messages", rows);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } catch (error) {
                    console.log('Error en server.js con dataHandler - socket new-message', error);
                }

            });
        })
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }


});


// INFO
// SELECCIONO LA BASE DE DATOS A UTILIZAR EN PRODUCTROUTER.JS