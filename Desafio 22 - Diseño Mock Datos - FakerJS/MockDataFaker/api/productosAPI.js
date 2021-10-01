const generador = require('../generador/productosFaker')
const util = require('../utils/utils')


const generarProductos = (req, res) => {
    let productos = []
    let cant = req.params.cant || 10
    console.log(`Req.params = ${cant}`)
    if (cant == 0) res.json({ message: ' No hay productos - La cantidad indicada es 0' })
    for (let i = 0; i < cant; i++) {
        let producto = generador.generateProduct()
        producto.id = i + 1
        producto.fecha = util.getFecha()
        console.log(`Req.params = ${cant}, producto creado ${producto}`)
        productos.push(producto)
    }
    res.json({ productos })
}


module.exports = {
    generarProductos
}
