const Session = require('express-session')

const SessionMiddleware = Session({
    secret: 'coderhouseLauraDoria',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 100000 }
})

export default SessionMiddleware