const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const router = express.Router()
const passport = require('passport')
const path = require('path')
const { fork } = require('child_process')
const { numCPUs, wrongMsgRoute } = require('../keys')
const { transporter, mailOptions, mailOptionsLogOut } = require("../mailing/nodemailer")

const ProductRouter = require('./product.router')
const productRouter = new ProductRouter
const CartRouter = require('./cart.router')
const cartRouter = new CartRouter
const OrderRouter = require('./order.router')
const orderRouter = new OrderRouter
const MessageRouter = require('./message.router')
const messageRouter = new MessageRouter

router.use('/product', isAuthenticated, productRouter.start())
router.use('/cart', isAuthenticated, cartRouter.start())
router.use('/order', isAuthenticated, orderRouter.start())
router.use('/chat', isAuthenticated, messageRouter.start())



router.get('/', isAuthenticated, (req, res, next) => {
    res.render('index', {
        title: 'Ecommerce',
        productsExist: false,
        // items: productRouter.getProducts()
    })
})

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
}))

router.get('auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/sigin'
}))

router.get('/profile', (req, res) => {
    res.render('profile', {
        title: 'Profile',
        user: req.user
    })
})

router.get('/signup', (req, res, next) => {
    res.render('signup', {
        title: 'Sign Up',
    })
})

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
}))

router.get('/signin', (req, res, next) => {
    res.render('signin', {
        title: 'Sign In',
    })

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
            return err
        }
        console.log(info)
    })
})

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    passReqToCallback: true
}))

router.get('/info', isAuthenticated, (req, res, next) => {
    res.render('info', {
        title: 'Information',
        req: req,
        process: process,
        numCPUs: numCPUs
    })
})

router.get('/logout', isAuthenticated, (req, res, next) => {
    req.logOut()
    res.redirect('/')

    transporter.sendMail(mailOptionsLogOut, (err, info) => {
        if (err) {
            console.log(err)
            return err
        }
        console.log(info)
    })
})

router.get('/randoms', (req, res, next) => {
    const childProcess = fork(path.join(__dirname, '../ChildProcess/child_random.js'))
    childProcess.send({ 'cant': req.query.cant })
    childProcess.on('message', message => {
        // res.json({ Resultado: message })
        res.render('randoms', {
            title: 'Randoms',
            listRandom: message
        })
    })
})

// Wrong routes
router.get("**", (req, res) => {
    res.status(200).json(wrongMsgRoute)
})
router.post("**", (req, res) => {
    res.status(200).json(wrongMsgRoute)
})
router.delete("**", (req, res) => {
    res.status(200).json(wrongMsgRoute)
})


//FUNCTIONS
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/signin')
}


module.exports = router