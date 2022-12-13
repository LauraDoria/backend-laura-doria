import Config from '../Config/config'
import session from "express-session"

const SessionMiddleware = session({
    secret: Config.Env.SESSION,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 100000 }
})

export default SessionMiddleware