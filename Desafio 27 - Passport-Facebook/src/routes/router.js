const express = require('express')
const router = express.Router()
const passport = require('passport')

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
    res.send('You are a valid user')
    // res.render('profile', {
    //     title: 'Profile',
    //     user: req.user
    // })
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