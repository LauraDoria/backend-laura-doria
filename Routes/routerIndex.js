const { Router } = require('express')
const Router = Router()
const LoginRouter = require('./loginRouter')
const RegisterRouter = require('./registerRouter')
const HomeRouter = require('./homeRouter')
const LogoutRouter = require('./logoutRouter')
const InfoRouter = require('./infoRouter')
const RandomRouter = require('./randomRouter')
if(process.env.PERS == 'ARCHIVO') {
    const ProductRouter = require('./archivoRouter')
} else if(process.env.PERS == 'FIREBASE') {
    const ProductRouter = require('./firebaseRouter')
} else if(process.env.PERS == 'MEMORIA') {
    const ProductRouter = require('./memoriaRouter')
} else {
    const ProductRouter = require('./mongoDBRouter')
}
const Logger = require('../Utils/logger')

//Rutas
Router.use('/shop', ProductRouter)
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