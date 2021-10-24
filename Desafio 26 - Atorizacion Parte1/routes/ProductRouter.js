const express = require('express')
const routerProductos = express.Router()
const { dataBaseSelection } = require('../constants/constants')
const path = require('path')
const { findUser } = require('../routes/login')
const session = require('express-session')

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

// -------------------------------------------------------------------------
// ---------- PASSPORT ----------------------------------------------
// ------------------------------------------------------------------------
const bCrypt = require('bCrypt') //para encriptar contraseñas
const passport = require('passport')

const { initialize } = require('../auth/passport-config')
//TEMPORALMENTE PONGO FINDUSER DE LOGIN
const { users } = require('../routes/login')
initialize(passport,
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id))

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/home')
    }
    next()
}
// Initialize passport and restore authentication
routerProductos.use(passport.initialize())
routerProductos.use(passport.session())


// RUTAS LOGIN/LOGOUT/HOME
routerProductos.get('/', checkAuthenticated, (req, res) => {
    const sessionAct = req.session
    if (sessionAct.user) {
        res.redirect('/home')
    } else {
        res.sendFile(path.resolve(path.join('public', 'login.html')))
    }

})
routerProductos.get('/home', (req, res) => {
    const sessionAct = req.session
    const userAct = sessionAct.user
    if (sessionAct.user) {
        res.sendFile(path.resolve(path.join('public', 'index.html')))
    } else {
        res.redirect('/')
    }
})
routerProductos.get('/password-invalid', checkNotAuthenticated, (req, res) => {
    res.json({ mensaje: 'Usuario INEXISTENTE, pruebe nuevamente en /login ' })
})
routerProductos.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
})
    // (req, res) => {
    // const { user } = req.body
    // userName = user
    // const sessionAct = req.session
    // sessionAct.user = user
    // findUser(user, req, res)
    // }
)

routerProductos.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})
// routerProductos.get('/logout', (req, res) => {
//     const sessionAct = req.session
//     const userAct = sessionAct.user
//     req.session.destroy(err => {
//         if (!err) res.send(`Logout Ok!!, Saludos ${userAct}`)
//         else res.send({ status: 'Logout ERROR', body: err })
//     })
// })
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
routerProductos.post('/mensajes/save', db.addMessage)


// -------------------------------------------------------------------------
// ---------- PASSPORT ----------------------------------------------
// ------------------------------------------------------------------------
// const bCrypt = require('bCrypt') //para encriptar contraseñas
// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy

// passport.use('login', new LocalStrategy({
//     passReqToCallback: true
// },
//     function (req, username, password, done) {
//         db.findAnUser(username, password, done)
//     }
// ))



module.exports = { routerProductos };