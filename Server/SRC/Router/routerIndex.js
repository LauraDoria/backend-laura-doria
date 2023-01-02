const {adminRouter} = require('./Routes/adminRouter')
const {Logger} = require('../Utils/Logger')
const {Router} = require('express')
const {shopRouter} = require('./Routes/shopRouter')
const {userRouter} = require('./Routes/userRouter')

const MainRouter = Router()


MainRouter.use('/admin', adminRouter)
MainRouter.use('/shop', shopRouter)
MainRouter.use('/user', userRouter)

//Home
MainRouter.get('/', (req, res) => {
    try {
        res.render('home')
        Logger.LoggerInfo.info('GET request to / successful. ' + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Rutas de error
MainRouter.get('/error', (req, res) => {
    try {
        res.render('error')
        Logger.LoggerInfo.info('GET request to /error successful. ' + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Rutas inexistentes
MainRouter.get('*', (req, res) => {
    try {
        res.render('notFound')
        Logger.LoggerInfo.info('GET request to /not-found successful. ' + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

module.exports = {MainRouter}