import Bcrypt from 'bcrypt'
import {mongooseSchemas} from '../Config/MongoDB/Models/mongooseSchemas'
import passport from "passport"
import { Strategy } from 'passport-local'

const PassportMiddleware = passport.initialize()
PassportMiddleware.session()
const localStrategy = Strategy
PassportMiddleware.use(
    new localStrategy((username, password, done) => {
        mongooseSchemas.User.findOne({email}, (error, user) => {
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
    const user = await mongooseSchemas.User.findById(id)
    return done(null, user)
})

export default PassportMiddleware