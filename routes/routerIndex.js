const { Router } = require('express')
const Router = Router()
const LoginRouter = require('./loginRouter')
const RegisterRouter = require('./registerRouter')
const HomeRouter = require('./homeRouter')
const LogoutRouter = require('./logoutRouter')

//Rutas
Router.use('/login', LoginRouter)
Router.use('/register', RegisterRouter)
Router.use('/user', HomeRouter)
Router.use('/logout', LogoutRouter)
Router.get('/', (req, res) => {
    res.redirect('/user')
})
Router.get('*', (req, res) => {
    res.render('not-found')
})

export default Router