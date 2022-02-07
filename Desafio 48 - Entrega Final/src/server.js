if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: './.env' })
}

const express = require('express')
const bodyParser = require('body-parser')
const engine = require('ejs-mate')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const { PORT, MY_SECRET, numCPUs, modoForkOrCluster, MONGODB } = require('./keys')
// const PORT = process.env.PORT || process.argv[2]
// const secret = process.env.my_secret
// const numCPUs = process.env.numCPUs
// const modoForkOrCluster = process.env.modoForkOrCluster || process.argv[5]

const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const { cluster } = require('cluster')
const router = require('./routes/router')
// Initializations
const app = express()
const MongoStore = require('connect-mongo')

require('./database') //Database
require('./passport/local-auth') //Passport

// Settings
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('port', PORT)

//Middlewares - Funciones que pasan antes de ir a una Ruta
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'))
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://mlabo:mlabo@cluster0.mmjbd.mongodb.net/session?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    }),
    secret: MY_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 60000
    },
    rolling: true
}))
app.use(bodyParser.json())
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage')
    app.locals.signinMessage = req.flash('signinMessage')
    app.locals.user = req.user
    next()
})

//Routes
app.use('/', router)


// WEBSOCKET
const { createServer } = require('http')
const { Server } = require('socket.io')
const { saveMessage, readMessage } = require('./database')
const httpServer = createServer(app)
const io = new Server(httpServer, {})

io.on("connection", async function (socket) {
    console.log("Alguien se ha conectado con Sockets");
    const msgs = await readMessage()
    socket.emit("mensajes", msgs);
    socket.on("new-mensaje", function (data) {
        saveMessage(data);
        msgs.push(data)
        io.sockets.emit("mensajes", msgs);
    });
})


// CLUSTER Module
if (modoForkOrCluster === 'CLUSTER' && cluster.isMaster) {
    console.log(`Numero de CPUs: ${numCPUs}`)
    console.log(`PID Master ${process.pid} is running`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker) => {
        console.log(
            "Worker",
            worker.process.pid,
            "died",
            new Date().toLocaleString()
        );
        cluster.fork();
    });
} else {

    //Starting SERVER
    httpServer.listen(app.get('port'), err => {
        if (err) throw new Error(`Error en el servidor ${err}`)
        console.log(`Servidor inicializado en PORT localhost:`, app.get('port'))
    })
}