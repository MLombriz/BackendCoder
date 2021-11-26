const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const { facebook } = require('../keys')
const User = require('../schemas/user')
const facebookUser = require('../schemas/facebookUser')

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(function (id, done) {
    return done(null, id)
})

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'No User Found.'))
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Incorrect Password.'))
    }
    done(null, user)
}))

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email })
    if (user) {
        return done(null, false, req.flash('signupMessage', 'That Email Already Exists.'))
    } else {
        const newUser = new User()
        newUser.email = email
        newUser.password = newUser.encryptPassword(password)
        await newUser.save()
        done(null, newUser)
    }
}))

passport.use('facebook', new FacebookStrategy({
    clientID: facebook.id,
    clientSecret: facebook.secret,
    callbackURL: 'auth/facebook/callback',
    profileFields: ['id', 'displayName', 'provider', 'photos']
}, async (accesToken, refreshToken, profile, done) => {
    const user = await facebookUser.findOne({ provider_id: profile.id })
    if (user) {
        return done(null, user)
    } else {
        var newUser = new facebookUser({
            provider_id: profile.id,
            provider: profile.provider,
            name: profile.displayName,
            photo: profile.photos[0].value
        })
        await newUser.save()
        done(null, newUser)
    }
}))