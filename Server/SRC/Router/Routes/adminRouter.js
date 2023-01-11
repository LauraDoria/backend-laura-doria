const {AdminPermitsMiddleware} = require('../../Middlewares/AdminPermitsMiddleware')
const {JWTAuthenticationMiddleware} = require('../../Middlewares/JWTAuthMiddleware')
//const {PassportAuthMiddleware} = require('../../SRC/Middlewares/PassportAuthMiddleware')
const {Logger} = require('../../Utils/Logger')
const {ProductControllers} = require('../../Controllers/ProductControllers')
const {Router} = require('express')
const {UnitsCalculator} = require('../../Utils/Calculator')
const {UserControllers} = require('../../Controllers/UserControllers')

const adminRouter = Router()

/* RUTAS */////////////////////////////////////////////////////////////////////////////

/* ADMINISTRADOR DE PRODUCTOS (usuario autenticado y autorizado) */
//Administar productos - GET formulario de administrador de base de datos de productos.
adminRouter.get('/:adminId/products', JWTAuthenticationMiddleware/*PassportAuthMiddleware*/, AdminPermitsMiddleware, (req, res) => {
    try {
        res.render('adminProducts', {unitsTotal: UnitsCalculator(cart)})
        Logger.LoggerInfo.info(`GET request to /admin/${adminId}/products successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Administar productos - POST agregar nuevos productos al listado.
adminRouter.post('/:adminId/products', JWTAuthenticationMiddleware/*PassportAuthMiddleware*/, AdminPermitsMiddleware, (req, res) => {
    try {
        const productData = req.body
        ProductControllers.addNewProduct(productData)
        res.render('adminProducts', {
            message: 'Se agregó un nuevo producto al listado.',
            unitsTotal: UnitsCalculator(cart)
        })
        Logger.LoggerInfo.info(`POST request to /admin/${adminId}/products successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Administar productos - PUT modificar productos del listado.
adminRouter.put('/:adminId/products/:productId', JWTAuthenticationMiddleware/*PassportAuthMiddleware*/, AdminPermitsMiddleware, (req, res) => {
    try {
        const updatedData = req.body
        const productId = parseInt(updatedData.idNumber)
        if (updatedData.productStock) {
            const currentStock = ProductControllers.getProductById(productId).productStock
            const addition = updatedData.productStock
            updatedData.productStock = currentStock + addition
        }
        ProductControllers.updateProductInfo(productId, updatedData)
        res.render('adminProducts', {
            message: `Se modificaron los datos del producto Id: ${productId}.`,
            unitsTotal: UnitsCalculator(cart)
        })
        Logger.LoggerInfo.info(`PUT request to /admin/${adminId}/products/${productId} successful. ` + new Date().toLocaleTimeString()) 
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Administar productos - DELETE eliminar producto del listado.
adminRouter.delete('/:adminId/products/:productId', JWTAuthenticationMiddleware/*PassportAuthMiddleware*/, AdminPermitsMiddleware, (req, res) => {
    try {
        const productId = parseInt(req.params.productId)
        ProductControllers.deleteProductById(productId)
        res.render('adminProducts', {
            message: `Se eliminaron los datos del producto Id: ${productId}.`,
            unitsTotal: UnitsCalculator(cart)
        })
        Logger.LoggerInfo.info(`DELETE request to /admin/${adminId}/products/${productId} successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)    
    }
})

//Administar productos - DELETE eliminar todos los productos del listado.
adminRouter.delete('/:adminId/products/all', JWTAuthenticationMiddleware/*PassportAuthMiddleware*/, AdminPermitsMiddleware, (req, res) => {
    try {
        ProductControllers.deleteAllProducts()
        res.render('adminProducts', {
            message: 'Se eliminaron todos los productos del listado.',
            unitsTotal: UnitsCalculator(cart)
        })
        Logger.LoggerInfo.info(`DELETE request to /admin/${adminId}/products/all successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)  
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ADMINISTRADOR DE USUARIOS (usuario autenticado y autorizado) */
//Administrar usuarios - GET formulario de administrador de base de datos de usuarios.
adminRouter.get('/:adminId/users', JWTAuthenticationMiddleware/*PassportAuthMiddleware*/, AdminPermitsMiddleware, (req, res) => { //Ver middleware de autorización de usuario adminstrador
    try {
        res.render('adminUsers', {unitsTotal: UnitsCalculator(cart)})
        Logger.LoggerInfo.info(`GET request to /admin/${adminId}/users successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Administrar usuarios - GET obtener usuario del listado.
adminRouter.get('/:adminId/users/:userId', JWTAuthenticationMiddleware/*PassportAuthMiddleware*/, AdminPermitsMiddleware, (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
        res.render('adminUsers', {
            users: UserControllers.getUserById(userId),
            unitsTotal: UnitsCalculator(cart)
        })
        Logger.LoggerInfo.info(`GET request to /admin/${adminId}/users/${userId} successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Administrar usuarios - GET obtener todos usuarios del listado.
adminRouter.get('/:adminId/users/all', JWTAuthenticationMiddleware/*PassportAuthMiddleware*/, AdminPermitsMiddleware, (req, res) => {
    try {
        res.render('adminUsers', {
            users: UserControllers.getAllUsers(),
            unitsTotal: UnitsCalculator(cart)
        })       
        Logger.LoggerInfo.info(`GET request to /admin/${adminId}/users/all successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Administrar usuarios - PUT modificar permisos de administrador de usuario.
adminRouter.put('/:adminId/users/:userId', JWTAuthenticationMiddleware/*PassportAuthMiddleware*/, AdminPermitsMiddleware, (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
        const userData = req.body
        UserControllers.updateUserInfo(userId, userData)
        res.render('adminUsers', {
            message: `Se modificaron permisos de administrador para el usuario Id: ${userId}.`,
            unitsTotal: UnitsCalculator(cart)
        })
        Logger.LoggerInfo.info(`PUT request to /admin/${adminId}/users/${userId} successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Administrar usuarios - DELETE eliminar usuario del listado.
adminRouter.delete('/:adminId/users/:userId', JWTAuthenticationMiddleware/*PassportAuthMiddleware*/, AdminPermitsMiddleware, (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
        UserControllers.deleteUserById(userId)
        res.render('adminUsers', {
            message: `Se eliminaron los datos del usuario Id: ${userId}.`,
            unitsTotal: UnitsCalculator(cart)
        })
        Logger.LoggerInfo.info(`DELETE request to /admin/${adminId}/users/${userId} successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Administrar usuarios - DELETE eliminar todos usuarios del listado.
adminRouter.delete('/:adminId/users/all', JWTAuthenticationMiddleware/*PassportAuthMiddleware*/, AdminPermitsMiddleware, (req, res) => {
    try {
        UserControllers.deleteAllUsers()
        res.render('adminUsers', {
            message: `Se eliminaron todos los usuarios del listado.`,
            unitsTotal: UnitsCalculator(cart)
        })
        Logger.LoggerInfo.info('DELETE request to /admin/users successful.' + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

module.exports = {adminRouter}