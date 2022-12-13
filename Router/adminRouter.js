import { Logger } from '../SRC/Utils/Logger'
import ProductControllers from '../Controllers/ProductControllers'
import { Router } from 'express'
import UserControllers from '../Controllers/UserControllers'

const adminRouter = Router()

//Rutas
//Administar productos - GET formulario de administrador de base de datos de productos
adminRouter.get('/admin/products', (req, res) => {
    res.render('adminProducts')
    Logger.Logger.LoggerInfo.info('GET request to /admin/product successful.' + new Date().toLocaleTimeString())
})

//Administar productos - POST agregar nuevos productos al listado
adminRouter.post('/admin/products', (req, res) => {
    ProductControllers.addNewProduct()
    Logger.Logger.LoggerInfo.info('GET request to /admin/products successful.' + new Date().toLocaleTimeString())
})

//Administar productos - PUT modificar productos del listado
adminRouter.put('/admin/products', (req, res) => {
    ProductControllers.updateProductInfo()
    Logger.Logger.LoggerInfo.info('PUT request /admin/products successful.' + new Date().toLocaleTimeString())
})

//Administar productos - DELETE eliminar productos del listado
adminRouter.delete('/admin/products', (req, res) => {
    ProductControllers.deleteProductById()
    ProductControllers.deleteAllProducts()
    Logger.Logger.LoggerInfo.info('DELETE request to /admin/products successful.' + new Date().toLocaleTimeString())
})

//Administrar usuarios - GET formulario de administrador de base de datos de usuarios
adminRouter.get('/admin/users', (req, res) => {
    res.render('adminUsers')
    Logger.Logger.LoggerInfo.info('GET request to /admin/users successful.' + new Date().toLocaleTimeString())
})

//Administrar usuarios - GET obtener usuarios del listado
adminRouter.get('/admin/users', (req, res) => {
    UserControllers.getUserById()
    UserControllers.getAllUsers()
    Logger.Logger.LoggerInfo.info('GET request to /admin/users successful.' + new Date().toLocaleTimeString())
})

//Administrar usuarios - DELETE eliminar usuarios del listado
adminRouter.delete('/admin/users', (req, res) => {
    UserControllers.deleteUserById()
    UserControllers.deleteAllUsers()
    Logger.Logger.LoggerInfo.info('DELETE request to /admin/users successful.' + new Date().toLocaleTimeString())
})

export default adminRouter