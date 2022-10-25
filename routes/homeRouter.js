const Authentication = require('../middlewares/authentication')
const User = require('../models/mongooseSchemas')
const { Router } = require('express')

const homeRouter = Router()

const Logger = require('../utils/logger')

//Rutas
homeRouter.get('/user', Authentication, async (req, res) => {
    const userData = await User.findById(req.user._id) 
    res.render('user', {
         data: userData
    })
    Logger.Logger.LoggerInfo.info('GET /user request ' + new Date().toLocaleTimeString())
})

export default homeRouter