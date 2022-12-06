const { Router } = require('express')
const Router = Router()
const LoginRouter = require('./loginRouter')
const RegisterRouter = require('./registerRouter')
const HomeRouter = require('./homeRouter')
const LogoutRouter = require('./logoutRouter')
const InfoRouter = require('./infoRouter')
const RandomRouter = require('./randomRouter')
const shopRouter = require('./shopRouter')
const Logger = require('../SRC/Utils/Logger')

//Emplear middlewares en las rutas que sea necesario, ejemplo: autenticación al hacer un log in

//Rutas
Router.use('/shop', shopRouter)
Router.use('/login', LoginRouter)
Router.use('/register', RegisterRouter)
Router.use('/user', HomeRouter)
Router.use('/logout', LogoutRouter)
Router.use('/info', InfoRouter)
Router.use('/random', RandomRouter)
Router.get('/', (req, res) => {
    res.redirect('/user')
    Logger.Logger.LoggerInfo.info('GET /user request successful.' + new Date().toLocaleTimeString())
})
Router.get('*', (req, res) => {
    res.render('not-found')
    Logger.Logger.LoggerInfo.info('GET /not-found successful.' + new Date().toLocaleTimeString())
})

export default Router