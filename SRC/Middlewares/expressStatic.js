const Express = require('express')
const Path = require('path')
const Config = require('../config/config')

const ExpressStatic = app.use(Express.static(Path.join(__dirname, Config.Env.STATIC)))

export default ExpressStatic