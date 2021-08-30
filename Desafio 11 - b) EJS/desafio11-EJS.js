const express = require('express')
const fs = require('fs')

// Creo pagina con express
const app = express()
const router = express.Router()

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor inicializado en localhost:${server.address().port}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", "./views")

app.use('/api', router)
app.use(express.static('public'))

router.get('/', (req, res) => {
    res.sendFile(__path.resolve(__dirname + '/public/index.html'))
})

router.get('/productos/vista', (req, res) => {
    try {
        fs.promises.readFile('./Productos.json').then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            res.render("index", { items: productos, productsExist: productos.length > 0 ? true : false });
        })
    } catch (error) {
        console.log('Error en /api/productos/listar', error)
    }
});

router.get('/productos/listar', (req, res) => {
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

router.get('/productos/listar/:id', (req, res) => {
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

router.post('/productos/guardar', (req, res) => {
    try {
        fs.promises.readFile('./Productos.json').then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            const productoNuevo = { ...{ title: req.body.title, price: req.body.price, pictureUrl: req.body.pictureUrl }, id: productos.length + 1 }
            productos.push(productoNuevo)
            fs.promises.writeFile('./Productos.json', JSON.stringify(productos, null, '\t'))
            console.log('Producto agregado con exito...')
            res.redirect('/')
            // res.json({ productos })
        })
    } catch (error) {
        console.log('Error en /api/productos/guardar', error)
    }
})

router.put('/productos/actualizar/:id', (req, res) => {
    try {
        fs.promises.readFile('./Productos.json').then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            const id = req.params.id
            if (id > productos.length) {
                res.json({ error: `Producto No encontrado, se dispone unicamente de ${productos.length} productos` })
            }
            else {
                const productoActualizar = productos[id - 1]
                const productoActualizado = { title: req.body.title, price: req.body.price, pictureUrl: req.body.pictureUrl, id: id }
                productos[id - 1] = productoActualizado
                fs.promises.writeFile('./Productos.json', JSON.stringify(productos, null, '\t'))
                console.log('Producto Actualizado con exito...')
                res.json({ productoAnterior: productoActualizar, productoActualizado: productoActualizado })
            }
        })
    } catch (error) {
        console.log('Error en /api/productos/actualizar', error)
    }
})

router.delete('/productos/borrar/:id', (req, res) => {
    try {
        fs.promises.readFile('./Productos.json').then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            const id = req.params.id
            if (id > productos.length) {
                res.json({ error: `Producto No encontrado, se dispone unicamente de ${productos.length} productos` })
            }
            else {
                const productoEliminar = productos[id - 1]
                productos.splice(id - 1, 1)
                fs.promises.writeFile('./Productos.json', JSON.stringify(productos, null, '\t'))
                console.log('Producto Borrado con exito...')
                res.json({ productoEliminado: productoEliminar })
            }
        })
    } catch (error) {
        console.log('Error en /api/productos/borrar', error)
    }
})