const { Router } = require('express')
const Router = Router()
const LoginRouter = require('./loginRouter')
const RegisterRouter = require('./registerRouter')
const HomeRouter = require('./homeRouter')
const LogoutRouter = require('./logoutRouter')
const InfoRouter = require('./infoRouter')
const RandomRouter = require('./randomRouter')

const Logger = require('../utils/logger')

//Rutas
Router.use('/login', LoginRouter)
Router.use('/register', RegisterRouter)
Router.use('/user', HomeRouter)
Router.use('/logout', LogoutRouter)
Router.use('/info', InfoRouter)
Router.use('/random', RandomRouter)
Router.get('/', (req, res) => {
    res.redirect('/user')
    Logger.Logger.LoggerInfo.info('GET /user request ' + new Date().toLocaleTimeString())
})
Router.get('*', (req, res) => {
    res.render('not-found')
    Logger.Logger.LoggerInfo.info('GET /not-found ' + new Date().toLocaleTimeString())
})

export default Router