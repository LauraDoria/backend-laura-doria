const { Router } = require('express')
const Logger = require('../SRC/Utils/Logger')

const logoutRouter = Router()

//Rutas
logoutRouter.post('/user', (req, res) => {
    req.session.destroy((error) => {
        if (error) console.error(error)
        res.redirect('/login')
    })
    Logger.Logger.LoggerInfo.info('POST /user request ' + new Date().toLocaleTimeString())
})

export default logoutRouter