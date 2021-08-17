const express = require('express')
const fs = require('fs')

// Creo pagina con express
const app = express()
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor inicializado en localhost:${server.address().port}`)
})

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        route1: '(GET) api/productos/listar',
        route2: '(GET) api/productos/listar/:id',
        route3: '(POST) api/productos/guardar'
    })
})
app.get('/api/productos/listar', (req, res) => {
    try {
        fs.promises.readFile('./Productos.json').then(data => data.toString('utf-8')).then(datos => {
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
    } catch (error) {
        console.log('Error en /api/productos/listar', error)
    }
})

app.get('/api/productos/listar/:id', (req, res) => {
    try {

        fs.promises.readFile('./Productos.json').then(data => data.toString('utf-8')).then(datos => {
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
    } catch (error) {
        console.log('Error en /api/productos/listar/:id', error)
    }
})

app.post('/api/productos/guardar', (req, res) => {
    try {
        fs.promises.readFile('./Productos.json').then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            const productoNuevo = { ...{ title: req.body.title, price: req.body.price, pictureUrl: req.body.pictureUrl }, id: productos.length + 1 }
            productos.push(productoNuevo)
            fs.promises.writeFile('./Productos.json', JSON.stringify(productos, null, '\t'))
            console.log('Producto agregado con exito...')
            res.json({ productos })
        })
    } catch (error) {
        console.log('Error en /api/productos/guardar', error)
    }
})