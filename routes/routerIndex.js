//Require libraries
import express from 'express'
const {Router} = express
import loginRouter from './loginRouter'
import logoutRouter from './logoutRouter'
const router = Router()

/*Rutas*/
router.use('/login', loginRouter)
router.use('home/logout', logoutRouter)

//Otras rutas
router.get('*', (req, res) => {
    res.render('notFound')
    console.log('GET request unsuccesful. Request status: 404. Not found.')
})

export default router