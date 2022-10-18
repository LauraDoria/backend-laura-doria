const { Router } = require('express')

const logoutRouter = Router()

//Rutas
logoutRouter.post('/user', (req, res) => {
    req.session.destroy((error) => {
        if (error) console.error(error)
        res.redirect('/login')
    })
})

export default logoutRouter