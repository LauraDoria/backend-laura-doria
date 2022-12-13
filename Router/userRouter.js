import { Logger } from '../SRC/Utils/Logger'
import { Router } from 'express'
import UserControllers from '../Controllers/UserControllers'

const userRouter = Router()

//Rutas
//User home (carrito)
userRouter.get('/user/:id', (req, res) => {
    UserControllers.getProductsInCart()
    res.render('user')
    Logger.Logger.LoggerInfo.info('GET request to /user/:id successful.' + new Date().toLocaleTimeString())
})

//User home (carrito) - PUT modificar/eliminar productos en el carrito/vaciar carrito
userRouter.put('/user/:id', (req, res) => {
    UserControllers.updateProductInCart()
    UserControllers.deleteProductFromCart()
    UserControllers.emptyCart()
    Logger.Logger.LoggerInfo.info('PUT request to /user/:id successful.' + new Date().toLocaleTimeString())
})

//Account settings - GET formulario de configuración de cuenta
userRouter.get('/user/:id/settings', (req, res) => {
    res.render('accountSettings')
    Logger.Logger.LoggerInfo.info('GET request to /user/:id/settings successful.' + new Date().toLocaleTimeString())
})

//Account settings - PUT modificar datos de la cuenta cuenta
userRouter.get('/user/:id/settings', (req, res) => {
    UserControllers.updateUserInfo()
    Logger.Logger.LoggerInfo.info('PUT request to /user/:id/settings successful.' + new Date().toLocaleTimeString())
})

//Account settings - DELETE eliminar cuenta
userRouter.get('/user/:id/settings', (req, res) => {
    UserControllers.deleteUserById()
    Logger.Logger.LoggerInfo.info('DELETE request to /user/:id/settings successful.' + new Date().toLocaleTimeString())
})

//Página de compra
userRouter.get('/user/:id/shop', (req, res) => {
    res.render('cartForm')
    Logger.Logger.LoggerInfo.info('GET request to /user/:id/shop successful.' + new Date().toLocaleTimeString())
})

export default userRouter