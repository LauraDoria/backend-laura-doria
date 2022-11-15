//Require libraries
const Express = require('express')
const Path = require('path')
const Config = require('./Config/config')

//Instance server 
const app = Express()
const PORT = Config.Env.PORT

//Template engine
app.set('view engine', 'ejs');
app.set('views', Path.join(__dirname, Config.Env.STATIC))

//Require Middlewares
const ExpressJson = require('./Middlewares/expressJson')
const ExpressUrlEncoded = require('./Middlewares/expressUrlEncoded')
const ExpressStatic = require('./Middlewares/expressStatic')
const Session = require('./Middlewares/session')
const Passport = require('./Middlewares/passport')
const Gzip = require('./Middlewares/gzip')

//Logger
const Logger = require('./Utils/Logger')

//Router
const Router = require('../Router/routerIndex')

//DataBAse
let DBConnect = ''
if(Config.Env.PERS == 'MONGODB') DBConnect = require('../Persistence/MongoDB/Config/configMongo')

//Server UP
httpServer.listen(PORT, () => {
    Logger.Logger.LoggerInfo.info(`Server up on port ${PORT}. ${new Date().toLocaleTimeString()}`)
})
//Error
httpServer.on("error", (error) => {
    Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
})

