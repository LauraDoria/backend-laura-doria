//Require libraries
const Express = require('express')
const Path = require('path')
const Config = require('../config/config')

//Instance server 
const app = Express()
const PORT = Config.Env.PORT

//Template engine
app.set('view engine', 'ejs');
app.set('views', Path.join(__dirname, Config.Env.STATIC))

//Require Middlewares
const ExpressJson = require('../middlewares/expressJson')
const ExpressUrlEncoded = require('../middlewares/expressUrlEncoded')
const ExpressStatic = require('../middlewares/expressStatic')
const Session = require('../middlewares/session')
const Passport = require('../middlewares/passport')
const Gzip = require('../middlewares/gzip')

//Logger
const Logger = require('../Utils/logger')

//Router
const Router = require('../routes/routerIndex')

//DataBAse
const Mongoose = require('../db/config')

//Server UP
httpServer.listen(PORT, () => {
    Logger.Logger.LoggerInfo.info(`Server up on port ${PORT}. ${new Date().toLocaleTimeString()}`)
})
//Error
httpServer.on("error", (error) => {
    Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
})

