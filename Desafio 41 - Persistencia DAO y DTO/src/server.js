const express = require('express')
const engine = require('ejs-mate')
const path = require('path')
const morgan = require('morgan')
const { PORT, secret, numCPUs } = require('./keys')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const { cluster } = require('cluster')
const modoForkOrCluster = process.argv[5] || "FORK"
const router = require('./routes/router')
const gqlRouter = require('./routes/graphql-router')

// Initializations
const app = express()
const MongoStore = require('connect-mongo')
require('./database') //Database

require('./passport/local-auth') //Passport

// Settings
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || PORT)

//Middlewares - Funciones que pasan antes de ir a una Ruta
app.use(morgan('dev')) //Veo las solicitudes de un cliente en la consola
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://mlabo:mlabo@cluster0.mmjbd.mongodb.net/session?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    }),
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 60000
    },
    rolling: true
}))
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
app.use('/graphql', gqlRouter)

// CLUSTER Module
// modoForkOrCluster es una variable que creo para limitar el uso de cluster
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
    app.listen(app.get('port'), err => {
        if (err) throw new Error(`Error en el servidor ${err}`)
        console.log(`Servidor inicializado en PORT localhost:`, app.get('port'))
    })
}

//PM2
// --- MODO FORK ----
// pm2 start app.js --name='ServerX' --watch -- PORT
// --- MODO CLUSTER ----
// pm2 start app.js --name='ServerX' --watch i max -- PORT