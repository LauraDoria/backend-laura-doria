const {Env} = require('../config')

const sessionConfig = {
    secret: Env.SESSION,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 100000 }
}

module.exports = {sessionConfig}