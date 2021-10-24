const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcrypt')


function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username, password, done)
        if (user == null) {
            return done(null, false, { message: 'No user with that username' })
        }
        try {
            if (await bCrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (error) {
            return done(error)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'username' },
        authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((user, done) => {
        done(null, getUserById(id))
    })
}

module.exports = { initialize }