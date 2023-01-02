const {Env} = require('../config')

const corsOptions = {
    origin: `http://${Env.HOST}:${Env.PORT}`,
    credentials: true,
    optionsSuccessStatus: 200,
}

module.exports = {corsOptions}