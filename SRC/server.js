//Require libraries
import Config from './Config/config'
import Express from 'express'
import Path from 'path'

//Instance server 
const app = Express()
const PORT = Config.Env.PORT

//Template engine
app.set('view engine', 'ejs');
app.set('views', Path.join(__dirname, Config.Env.STATIC))

//Require Middlewares
import Cors from './Middlewares/cors'
import ExpressJson from './Middlewares/expressJson'
import ExpressUrlEncoded from './Middlewares/expressUrlEncoded'
import ExpressStatic from './Middlewares/expressStatic'
import GraphQL from './Middlewares/graphQL'
import Gzip from './Middlewares/gzip'
import PassportMiddleware from './Middlewares/passport'
import SessionMiddleware from './Middlewares/session'

//Logger
import Logger from './Utils/Logger'

//Router
import Router from '../Router/routerIndex'

//DataBAse
let DBConnect = ''
//if(Config.default.PERS == 'MONGODB') DBConnect = require('../Persistence/MongoDB/Config/configMongo')
//if(Config.default.PERS == 'FIREBASE')

//Server UP
httpServer.listen(PORT, () => {
    Logger.Logger.LoggerInfo.info(`Server up on port ${PORT}. ${new Date().toLocaleTimeString()}`)
})
//Error
httpServer.on("error", (error) => {
    Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
})

