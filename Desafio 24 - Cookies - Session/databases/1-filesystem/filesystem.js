const fs = require('fs')
const { administrator } = require('../../constants/constants')
const constants = require('../../constants/constants')
const productFile = './Json/Productos.json'
const messageFile = './Json/Mensajes.json'
const path = require('path')
// CRUD
exports.listarProd = async (req, res) => {
    try {
        fs.promises.readFile(productFile).then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            if (productos.length > 0) {
                res.json({ items: productos, productsExist: productos.length });
            } else {
                res.json({ error: 'No hay productos cargados' })
            }
        })
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}
exports.listarProdById = async (req, res) => {
    try {
        fs.promises.readFile(productFile).then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            const { id } = req.params
            let producto = productos.find(producto => producto.id === id)
            if (producto) {
                res.send(producto)
            } else {
                res.json({ error: `Producto No encontrado, no se dispone del ID: ${id} en el listado de productos` })
            }

        })
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }

}
exports.actualizarProd = async (req, res) => {
    if (administrator) {
        try {
            fs.promises.readFile(productFile).then(data => data.toString('utf-8')).then(datos => {
                const productos = JSON.parse(datos)
                const { id } = req.params
                let producto = productos.find(producto => producto.id === id)
                let index = productos.findIndex(producto => producto.id === id)
                if (producto) {
                    producto = req.body
                    producto.id = id
                    productos[index] = producto
                    fs.promises.writeFile(productFile, JSON.stringify(productos, null, '\t'))
                    console.log(`Producto ${producto.nombre} ID: ${id}, actualizado con exito...`)
                    res.send(`Producto ${producto.nombre} ID: ${id}, actualizado con exito...`)
                }
                else {
                    res.json({ error: `Producto No encontrado, no se dispone del ID: ${id} en el listado de productos` })

                }
            })
        } catch (err) {
            throw new Error(`Error en el servidor ${err}`)
        }
    }
}
exports.borrarProd = async (req, res) => {
    if (administrator) {
        try {
            fs.promises.readFile(productFile).then(data => data.toString('utf-8')).then(datos => {
                const productos = JSON.parse(datos)
                const { id } = req.params
                let producto = productos.find(producto => producto.id === id)
                let index = productos.findIndex(producto => producto.id === id)
                if (producto) {
                    const productoEliminar = productos[index]
                    productos.splice(index, 1)
                    fs.promises.writeFile(productFile, JSON.stringify(productos, null, '\t'))
                    console.log('Producto Borrado con exito...')
                    res.json({ productoEliminado: productoEliminar })
                }
                else {
                    res.json({ error: `Producto No encontrado, no se dispone del ID: ${id} en el listado de productos` })
                }
            })
        } catch (err) {
            throw new Error(`Error en el servidor ${err}`)
        }
    }
}
exports.agregarProd = async (req, res) => {
    if (administrator) {
        const { name, description } = req.body
        if (!name || !description) {
            res.json({ message: "The product needs a name and description" })
        } else {
            try {
                fs.promises.readFile(productFile).then(data => data.toString('utf-8')).then(datos => {
                    const productos = JSON.parse(datos)
                    const productoNuevo = req.body
                    const maxId = productos.reduce((acc, curr) => curr.id < acc.id ? acc.id : curr.id) //busco el maximo ID
                    productoNuevo.id = maxId++
                    productoNuevo.timestamp = Date.now()
                    productos.push(productoNuevo)
                    fs.promises.writeFile(productFile, JSON.stringify(productos, null, '\t'))
                    console.log('Producto agregado con exito...')
                    res.redirect('/')
                })
            } catch (err) {
                throw new Error(`Error en el servidor ${err}`)
            }
        }
    } else {
        res.send({ error: -1, descripcion: 'Ruta /agregar con método post NO autorizada' });
    }
}

//FILTROS

exports.prodFiltrarNombre = async (req, res) => {
    try {
        fs.promises.readFile(productFile).then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            const { nombre } = req.params
            let producto = productos.find(producto => producto.nombre === nombre)
            if (producto) {
                res.send(producto)
            } else {
                res.send({ error: 'Producto no encontrado' });
            }
        })
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}
exports.prodFiltrarCodigo = async (req, res) => {
    try {
        fs.promises.readFile(productFile).then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            const { codigo } = req.params
            let producto = productos.find(producto => producto.codigo === codigo)
            if (producto) {
                res.send(producto)
            } else {
                res.send({ error: 'Producto no encontrado' });
            }
        })
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}
exports.prodFiltrarPrecios = async (req, res) => {
    try {
        fs.promises.readFile(productFile).then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            const { precio1 } = req.params
            const { precio2 } = req.params
            let producto = productos.find(producto => producto.precio >= precio1 && producto.precio <= precio2)
            if (producto) {
                res.send(producto)
            } else {
                res.send({ error: 'Producto no encontrado' });
            }
        })
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}
exports.prodFiltrarStocks = async (req, res) => {
    try {
        fs.promises.readFile(productFile).then(data => data.toString('utf-8')).then(datos => {
            const productos = JSON.parse(datos)
            const { stock1 } = req.params
            const { stock2 } = req.params
            let producto = productos.find(producto => producto.stock >= stock1 && producto.stock <= stock2)
            if (producto) {
                res.send(producto)
            } else {
                res.send({ error: 'Producto no encontrado' });
            }
        })
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}

// MENSAJES
exports.addMessages = async (message) => {
    try {
        fs.promises.readFile(path.join(__dirname, "Json", "Mensajes.json")).then(data => data.toString('utf-8')).then(datos => {
            const messages = JSON.parse(datos)
            messages.push({
                ...message,
                _id: message.length + 1,
                createdAt: Date.now(),
                updatedAt: Date.now()
            })
            fs.promises.writeFile(messageFile, JSON.stringify(messages, null, '\t'))
        })
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}
exports.getMessages = async () => {
    const normalize = require('../../normalization/handler').getNormalizedData
    const schema = require('../../normalization/schemas/messages')
    const messages = await fs.promises.readFile(path.join(__dirname, "Json", "Mensajes.json")).then((content) => {
        let json = JSON.parse(content.toString("utf-8"));
        return json;
    })
    try {
        if (constants.DATA_NORMALIZATION) {
            return normalize(messages, schema)
        } else {
            return messages
        }
    } catch (err) {
        throw new Error(`Error en el servidor ${err}`)
    }
}