const Passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../models/mongooseSchemas')
const Bcrypt = require('bcrypt')

const PassportMiddleware = Passport.initialize()
PassportMiddleware.session()
const localStrategy = Strategy
PassportMiddleware.use(
    new localStrategy((username, password, done) => {
        User.findOne({email}, (error, user) => {
            if (error) console.error(error);
            if(!user) return done(null, false)
            Bcrypt.compare(password, user.password, (error, isMatch) => {
                if (error) console.error(error);
                if (isMatch) return done(null, user)
                return done(null, false)
            })
        })
    })
)
PassportMiddleware.serializeUser((user, done) => {
    done(null, user._id)
})
PassportMiddleware.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    return done(null, user)
})

export default PassportMiddleware