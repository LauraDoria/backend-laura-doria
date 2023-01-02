const Bcrypt = require('bcrypt')
//const {Env} = require('../Config/config')
const {Logger} = require('../../Utils/Logger')
//const {OAuth2Strategy} = require('passport-google-oauth')
const Passport = require('passport')
const {Strategy} = require('passport-local')
const {UserControllers} = require('../../Controllers/UserControllers')

Passport.initialize()
Passport.session()
const LocalStrategy = new Strategy()

//AUTENTICACIÓN CON LOCAL STRATEGY
//TypeError: LocalStrategy requires a verify callback
//Problema con el callback, parece que no reconoce la función done()
Passport.use('local', LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => {
    try {
        const requestedUser = UserControllers.getAllUsers().forEach(user => {
            if (user.username == username) return user 
        })
        if (!requestedUser) return done(null, false, {message: 'El usuario ingresado no existe.'})
        Bcrypt.compare(password, requestedUser.password, (error, isMatch) => {
            if (error) Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
            if (!isMatch) return done(null, false, {message: 'La contraseña ingresada no es correcta.'})
            localStorage.setItem('isAuth', JSON.stringify('YES'))
            return done(null, requestedUser)
        })
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        return done(error, false)
    }
}))

Passport.serializeUser((user, done) => {
    done(null, user.idNumber)
})
Passport.deserializeUser((idNumber, done) => {
    const user = UserControllers.getUserById(idNumber)
    return done(null, user)
})

//AUTENTICACIÓN CON OAUTH GOOGLE
/*Passport.use('auth-google', 
    new OAuth2Strategy({
        clientID: Env.GOOGLEID,
        clientSecret: Env.GOOGLESECRET,
        callbackURL: Env.GOOGLEURL
    }, (accessToken, refreshToken, profile, done) => {
        localStorage.setItem('isAuth', JSON.stringify('YES'))
        const userProfile = profile
        done(null, userProfile)
    }
))*/

module.exports = {Passport}