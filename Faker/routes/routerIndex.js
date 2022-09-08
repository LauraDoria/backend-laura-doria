import express from 'express'
import productRouter from './productRouter'
const {Router} = express
const router = Router()

/*Rutas*/
router.use('/products-test/:id', productRouter)
router.use('/products-test', productRouter)

//Otras rutas
router.get('*', (req, res) => {
    res.render('notFound')
    console.log('GET request unsuccesful. Request status: 404. Not found.')
})

export default router