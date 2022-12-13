import adminRouter from './adminRouter'
import { Logger } from '../SRC/Utils/Logger'
import { Router } from 'express'
import shopRouter from './shopRouter'
import userRouter from './userRouter'

const Router = Router()

//Devolver el código de estado correspondiente para cada solicitud
//Rutas
Router.use('/shop', shopRouter)
Router.use('/user', userRouter)
Router.use('/admin', adminRouter)
Router.get('/', (req, res) => {
    res.render('home')
    Logger.Logger.LoggerInfo.info('GET request to / successful.' + new Date().toLocaleTimeString())
})
Router.get('*', (req, res) => {
    res.render('not-found')
    Logger.Logger.LoggerInfo.info('GET request to /not-found successful.' + new Date().toLocaleTimeString())
})

export default Router

/*
Router.get('/', (req, res) => {
    res.redirect('/user')
    Logger.Logger.LoggerInfo.info('GET /user request successful.' + new Date().toLocaleTimeString())
})
*/