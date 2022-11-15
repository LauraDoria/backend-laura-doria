const { Router } = require('express')
const Router = Router()
const LoginRouter = require('./loginRouter')
const RegisterRouter = require('./registerRouter')
const HomeRouter = require('./homeRouter')
const LogoutRouter = require('./logoutRouter')
const InfoRouter = require('./infoRouter')
const RandomRouter = require('./randomRouter')
const PersConfig = require('../SRC/Config/config')
let ProductRouter = ''
if(PersConfig.Env.PERS == 'ARCHIVO') {
    ProductRouter = require('./archivoRouter')
} else if(PersConfig.Env.PERS == 'FIREBASE') {
    ProductRouter = require('./firebaseRouter')
} else if(PersConfig.Env.PERS == 'MEMORIA') {
    ProductRouter = require('./memoriaRouter')
} else {
    ProductRouter = require('./mongoDBRouter')
}
const Logger = require('../SRC/Utils/Logger')

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