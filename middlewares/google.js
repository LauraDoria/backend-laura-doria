import passport from "passport";
import {OAuth2Strategy} from "passport-google-oauth"
const Config = require('../config/config')

const Google = passport.use('auth-google', new OAuth2Strategy({
    clientID: Config.Env.GOOGLEID,
    clientSecret: Config.Env.GOOGLESECRET,
    callbackURL: Config.Env.GOOGLEURL
}, (accessToken, refreshToken, profile, done) => {
    const userProfile = profile
    done(null, userProfile)
}))

export default Google