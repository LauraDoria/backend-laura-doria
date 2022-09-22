const Authentication = require('../middlewares/authentication')
const User = require('../models/mongooseSchemas')
const { Router } = require('express')

const homeRouter = Router()

//Rutas
homeRouter.get('/user', Authentication, async (req, res) => {
    const userData = await User.findById(req.user._id) 
    res.render('user', {
         data: userData
    })
})

export default homeRouter