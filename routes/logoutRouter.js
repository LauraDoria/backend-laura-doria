const { Router } = require('express')

const logoutRouter = Router()

const Logger = require('../utils/logger')

//Rutas
logoutRouter.post('/user', (req, res) => {
    req.session.destroy((error) => {
        if (error) console.error(error)
        res.redirect('/login')
    })
    Logger.Logger.LoggerInfo.info('POST /user request ' + new Date().toLocaleTimeString())
})

export default logoutRouter