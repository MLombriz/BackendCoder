const express = require('express')
const routerProductos = express.Router()
const { dataBaseSelection } = require('../constants/constants')
// const { auth } = require('../server')



// routerProductos.get('/', auth, (req, res) => {
//     res.sendFile(__path.resolve(__dirname + '/public/index.html'))
// })

const factory = (db) => {
    switch (db) {
        case 0: //MEMORY
            return memoria = require('../databases/0-memory/memoria');
        case 1: // FILESYSTEM
            return fileSys = require('../databases/1-filesystem/filesystem');
        case 2: // MariaDB
            exports.database = require('../databases/2-MariaDB/conection');
            return mariadb = require('../databases/2-MariaDB/mariaDB');
        case 3: // MariaDBaaS
            return mariaDBaaS = require('../databases/2-MariaDB/mariaDBaaS');
        // NO SE VIO EN NINGUNA CLASE
        case 4: // SQLite3
            exports.database = require('../databases/4-sqlite3/conection');
            return sqlite3 = require('../databases/2-MariaDB/mariaDB');
        case 5: // MongoDB
            exports.URL = 'mongodb://localhost:27017/ecommerce';
            return mongodb = require('../databases/5-mongoDB/mongoDB');
        case 6: // MongoDBaaS
            return mongoDBaaS = require('../databases/6-MongoDBaaS/mongoDBaaS');
        case 7: // Firebase
            return firebase = require('../databases/6-firebase/firebase');
        default:
            break;
    }
}

// Selecciono Factory (Base de Datos a utilizar)
const db = factory(dataBaseSelection)


// RUTAS PRODUCTOS
// Lito TODOS los productos de la Base de Datos
routerProductos.get('/listar', db.listarProd)
// Listo UN producto de la Base de Datos
routerProductos.get('/listar/:id', db.listarProdById)
// Agrego UN producto a la Base de Datos
routerProductos.post('/agregar', db.agregarProd)
// Actualizo UN producto de la Base de Datos //VER SI FUNCIONA
routerProductos.put('/actualizar/:id', db.actualizarProd)
// Borro UN producto de la Base de Datos
routerProductos.delete('/borrar/:id', db.borrarProd)

// FILTROS PRODUCTOS
routerProductos.get('/nombre/:nombre', db.prodFiltrarNombre);
routerProductos.get('/codigo/:codigo', db.prodFiltrarCodigo);
routerProductos.get('/precios/:precio1/:precio2', db.prodFiltrarPrecios);
routerProductos.get('/stocks/:stock1/:stock2', db.prodFiltrarStocks);


// // Cargo UN mensaje en la Base de Datos 
// routerProductos.post('/mensajes/save', db.addMessage)


module.exports = routerProductos;