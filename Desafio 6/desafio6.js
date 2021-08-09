const fs = require('fs')

class Archivo {
    constructor(file) {
        this.file = file
    }
    exist() {
        try {
            return fs.existsSync(this.file)
        } catch (error) {
            console.log('No se pudo chequear si el archivo existe')
        }
    }
    async crear() {
        try {
            if (!this.exist()) {
                await fs.promises.writeFile(this.file, JSON.stringify([]))
                console.log('Archivo Creado Exitosamente: ', this.file)
            } else {
                throw Error
            }
        } catch (error) {
            console.log('No se puede crear el archivo', error);
        }
    }
    async leer() {
        try {
            const contenido = await fs.promises.readFile(this.file)
            const productos = JSON.parse(contenido.toString('utf-8'))
            console.log('Archivo leido: ')
            console.log(productos)
        } catch (error) {
            //console.log('No se pudo leer el archivo', error)
            console.log('Archivo inexistente: [ ]')
        }
    }
    async guardar(producto) {
        try {
            const contenido = await fs.promises.readFile(`./${this.file}`)
            const productos = JSON.parse(contenido.toString('utf-8'))
            const productoNuevo = { ...producto, id: productos.length + 1 }
            productos.push(productoNuevo)
            await fs.promises.writeFile(this.file, JSON.stringify(productos, null, '\t'))
            console.log('Producto agregado con exito...')

        } catch (error) {
            this.crear()
        }
    }
    async borrar() {
        try {
            if (this.exist()) {
                await fs.promises.unlink(this.file)
                console.log(`El archivo fue borrado de manera exitosa`);
            } else {
                console.log('El archivo buscado no existe')
            }
        } catch (error) {
            console.log('No se puede borrar el archivo', error);
        }
    }
}

const productos = new Archivo('Productos.json')
// Creo el documento Productos.txt
productos.crear()
    .then(() =>
        productos.guardar({ title: 'Termo Stanley', price: 3500, pictureUrl: 'https://placekitten.com/g/200/300' })
    )
    .then(() =>
        productos.guardar({ title: 'Mate Stanley', price: 950, pictureUrl: 'https://placekitten.com/g/200/300' })
    ).then(() =>
        productos.guardar({ title: 'Bombilla Alpaca', price: 1500, pictureUrl: 'https://placekitten.com/g/200/300' }))
    .then(() =>
        productos.leer())
    .finally(() =>
        setTimeout(() => {
            productos.borrar()
        }, 3000))