const { Router } = require('express')
const Router = Router()
const LoginRouter = require('./loginRouter')
const RegisterRouter = require('./registerRouter')
const HomeRouter = require('./homeRouter')
const LogoutRouter = require('./logoutRouter')
const InfoRouter = require('./infoRouter')
const RandomRouter = require('./randomRouter')

//Rutas
//Desafío clases 27-28
Router.use('/login', LoginRouter)
Router.use('/register', RegisterRouter)
Router.use('/user', HomeRouter)
Router.use('/logout', LogoutRouter)
Router.use('/info', InfoRouter)
Router.use('/random', RandomRouter)
Router.get('/', (req, res) => {
    res.redirect('/user')
})
Router.get('*', (req, res) => {
    res.render('not-found')
})

//Desafío clases 29-30
Router.use('/info', (req, res) => {
    res.send(`Express server (Nginx) - PORT ${parseInt(process.argv[2])} - PID ${process.pid}`)
})
Router.use('/api/random', Random)
export default Router