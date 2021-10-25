const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', isAuthenticated, (req, res, next) => {
    res.render('index', { productsExist: false }) //{ productsExist: false }
})


router.get('/signup', (req, res, next) => {
    res.render('signup')
})

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
}))

router.get('/signin', (req, res, next) => {
    res.render('signin')
})

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    passReqToCallback: true
}))

router.get('/home', isAuthenticated, (req, res, next) => {
    res.render('home')
})

router.get('/logout', isAuthenticated, (req, res, next) => {
    req.logOut()
    res.redirect('/')
})

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/signin')
}


module.exports = router