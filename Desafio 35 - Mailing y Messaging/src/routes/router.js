const express = require('express')
const router = express.Router()
const passport = require('passport')
const path = require('path')
const { fork } = require('child_process')
const { numCPUs } = require('../keys')
const { transporter, mailOptions, mailOptionsLogOut } = require("../mailing/nodemailer")

router.get('/', isAuthenticated, (req, res, next) => {
    res.render('index', {
        title: 'Ecommerce',
        productsExist: false
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

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/signin')
}


module.exports = router