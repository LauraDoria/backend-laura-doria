const Session = require('express-session')
const Config = require('../config/config')

const SessionMiddleware = Session({
    secret: Config.Env.SESSION,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 100000 }
})

export default SessionMiddleware