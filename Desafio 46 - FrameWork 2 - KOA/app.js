const koa = require('koa');
const koaBody = require('koa-body');

const app = new koa();

app.use(koaBody())

//Router
let books = require('./books.js')

app.use(books.routes())

// Server Listen
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor Koa escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log('Error en el Servidor Koa: ', error))