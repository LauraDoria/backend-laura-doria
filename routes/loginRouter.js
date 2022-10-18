const Passport = require('passport')
const { Router } = require('express')

const loginRouter = Router()

//Rutas
loginRouter.get('/login', (req, res) => {
    res.render('login')
})
loginRouter.post('/login', Passport.authenticate('local', {failureRedirect: 'login-error'}), (req, res) => {
    res.redirect('/user')
})

export default loginRouter