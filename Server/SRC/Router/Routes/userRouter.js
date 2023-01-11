//const {PassportAuthMiddleware, PassportLogout} = require('../../SRC/Middlewares/PassportAuthMiddleware')
const Bcrypt = require('bcrypt')
const {JWTAuthenticationMiddleware, JWTLoginMiddleware, JWTLogout} = require('../../Middlewares/JWTAuthMiddleware')
const {Logger} = require('../../Utils/Logger')
const {sendEmail} = require('../../Middlewares/NodemailerMiddleware')
//const {Passport} = require('../../SRC/Config/Passport/PassportConfig')
const {ProductControllers} = require('../../Controllers/ProductControllers')
const {Router} = require('express')
const {SignUpValidationMiddleware} = require('../../Middlewares/SignUpValidationMiddleware')
const {TotalCalculator, UnitsCalculator} = require('../../Utils/Calculator')
const {UserControllers} = require('../../Controllers/UserControllers')

const userRouter = Router()

/* RUTAS */////////////////////////////////////////////////////////////////////////////

/* LOG IN (no usuario autenticado) */
//Log in - GET formulario log in.
userRouter.get('/login', (req, res) => {
    try {
        res.render('login')
        Logger.LoggerInfo.info('GET request to /user/login succesful. ' + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Log in - POST validación de datos de usuario.
//Es lo mismo Authentication que Passport.authenticate?
//Posiblemente en vez de redirigir a página de error, redirigir a formulario log in, con mensajes de error
userRouter.post('/login', JWTLoginMiddleware /*Passport.authenticate('local', {failureRedirect: '/login'})*/, (req, res) => {
    try {
        const {username} = req.body
        const userId = UserControllers.getAllUsers().forEach(user => {
            if (user.username == username) {
                return user.idNumber                
            }
        })
        res.redirect(`/user/${userId}`)
        Logger.LoggerInfo.info('POST request to /user/login succesful. ' + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* SIGN UP (no usuario autenticado) */
//Sign up - GET formulario sign up.
userRouter.get('/register', (req, res) => {
    try {
        res.render('register')
        Logger.LoggerInfo.info('GET request to /user/register succesful. ' + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Sign up - POST registro de nuevo usuario.
userRouter.post('/register', SignUpValidationMiddleware, (req, res) => {
    try {
        const {username, name, password, email} = req.body
        const hashedPassword = Bcrypt.hash(password, 10)
        const newUser = {
            username: username,
            name: name,
            password: hashedPassword,
            email: email
        }
        UserControllers.createUser(newUser)
        const userId = UserControllers.getAllUsers().forEach(user => {
            if (user.username == username) {
                return user.idNumber                
            }
        })
        res.redirect(`/user/${userId}/cart`)
        Logger.LoggerInfo.info('POST request to /user/register succesful. ' + new Date().toLocaleTimeString()) 
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* LOG OUT (usuario autenticado) */
//Log out - POST cerrar sesión.
userRouter.post('/:userId/logout', JWTAuthenticationMiddleware /*PassportAuthMiddleware*/, (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
        //Logout con Passport
        /*
        PassportLogout(req, res)
        */

        //Logout con JWT
        JWTLogout()
        Logger.LoggerInfo.info(`POST request to /user/${userId}/logout succesful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* CARRITO (usuario autenticado) */
//Carrito (user home) - GET user home.
userRouter.get('/:userId/cart', JWTAuthenticationMiddleware /*PassportAuthMiddleware*/, (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
        const cart = UserControllers.getProductsInCart(userId)
        res.render('user', {
            cart: cart,
            unitsTotal: UnitsCalculator(cart),
            total: TotalCalculator(cart)
        })
        Logger.LoggerInfo.info(`GET request to /user/${userId}/cart successful. ` + new Date().toLocaleTimeString())   
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Carrito (user home) - PUT eliminar producto del carrito.
userRouter.put('/:userId/cart/:productId', JWTAuthenticationMiddleware /*PassportAuthMiddleware*/, (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
        const productId = parseInt(req.params.productId)
        UserControllers.deleteProductFromCart(userId, productId)
        const cart = UserControllers.getProductsInCart(userId)
        res.render('user', {
            message: 'Se eliminó un producto del carrito.',
            cart: cart,
            unitsTotal: UnitsCalculator(cart),
            total: TotalCalculator(cart)
        })  
        Logger.LoggerInfo.info(`PUT request to /user/${userId}/cart/${productId} successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Carrito (user home) - PUT vaciar carrito.
userRouter.put('/:userId/cart/all', JWTAuthenticationMiddleware /*PassportAuthMiddleware*/, (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
        UserControllers.emptyCart(userId)
        res.render('user', {
            cart: UserControllers.getProductsInCart(userId),
            unitsTotal: UnitsCalculator(cart)
        }) 
        Logger.LoggerInfo.info(`PUT request to /user/${userId}/cart/all successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* PÁGINA DE PRODUCTO (usuario autenticado) */
//Página de producto - GET página de producto.
userRouter.get('/:userId/shop/products/:productId', (req, res) => {
    try {
        const isAuth = localStorage.getItem('isAuth')
        if (isAuth != 'YES') {
            res.redirect('/shop/products/:productId')
        } else {
            const userId = parseInt(req.params.userId)
            const productId = parseInt(req.params.productId)
            res.render('productPageUser', {
                idNumber: ProductControllers.getProductById(productId).idNumber,
                stock: ProductControllers.getProductById(productId).stock,
                name: ProductControllers.getProductById(productId).name,
                productType: ProductControllers.getProductById(productId).productType,
                skinType: ProductControllers.getProductById(productId).skinType,
                hairType: ProductControllers.getProductById(productId).hairType,
                function: ProductControllers.getProductById(productId).function,
                zeroWaste: ProductControllers.getProductById(productId).zeroWaste,
                price: ProductControllers.getProductById(productId).price,
                presentation: ProductControllers.getProductById(productId).presentation,
                detailThumbnail: ProductControllers.getProductById(productId).detailThumbnail,
                description: ProductControllers.getProductById(productId).description,
                instructions: ProductControllers.getProductById(productId).instructions,
                inci: ProductControllers.getProductById(productId).inci,
                unitsTotal: UnitsCalculator(cart)
            })
            Logger.LoggerInfo.info(`GET request to /user/${userId}/shop/products/${productId} successful. ` + new Date().toLocaleTimeString())    
        }
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

/*
Cambiar el action del form para agregar productos al carrito con un condicional
Condición inCart == true
*/
//Página de producto - PUT agregar nuevo producto al carrito.
userRouter.put('/:userId/shop/products/:productId/add', (req, res) => {
    try {
        const isAuth = localStorage.getItem('isAuth')
        if (isAuth != 'YES') {
            res.redirect('/shop/products/:productId')
        } else {
            const userId = parseInt(req.params.userId)
            const productId = parseInt(req.params.productId)
            const productQuantity = parseInt(req.body)
            UserControllers.addProductToCart(userId, productId, productQuantity)
            res.render('productPageUser', {
                message: 'Se agregó un producto a tu carrito.',
                idNumber: ProductControllers.getProductById(productId).idNumber,
                stock: ProductControllers.getProductById(productId).stock,
                name: ProductControllers.getProductById(productId).name,
                productType: ProductControllers.getProductById(productId).productType,
                skinType: ProductControllers.getProductById(productId).skinType,
                hairType: ProductControllers.getProductById(productId).hairType,
                function: ProductControllers.getProductById(productId).function,
                zeroWaste: ProductControllers.getProductById(productId).zeroWaste,
                price: ProductControllers.getProductById(productId).price,
                presentation: ProductControllers.getProductById(productId).presentation,
                detailThumbnail: ProductControllers.getProductById(productId).detailThumbnail,
                description: ProductControllers.getProductById(productId).description,
                instructions: ProductControllers.getProductById(productId).instructions,
                inci: ProductControllers.getProductById(productId).inci,
                unitsTotal: UnitsCalculator(cart)
            })
            Logger.LoggerInfo.info(`PUT request to /user/${userId}/shop/products/${productId}/add successful. ` + new Date().toLocaleTimeString())
        }
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Página de producto - PUT modificar cantidad de unidades de un producto existente en el carrito.
userRouter.put('/:userId/shop/products/:productId/update', (req, res) => {
    try {
        const isAuth = localStorage.getItem('isAuth')
        if (isAuth != 'YES') {
            res.redirect('/shop/products/:productId')
        } else {
            const userId = parseInt(req.params.userId)
            const productId = parseInt(req.params.productId)
            const addition = parseInt(req.body)
            const currentQuantity = UserControllers.getProductsInCart(userId).forEach(product => {
                if (product.productData.idNumber == productId) {
                    return product.productQuantity
                }  
            })
            const updatedQuantity = currentQuantity + addition
            UserControllers.updateProductInCart(userId, productId, updatedQuantity)
            res.render('productPageUser', {
                message: 'Se modificó un producto en tu carrito.',
                unitsTotal: UnitsCalculator(cart)
            })
            Logger.LoggerInfo.info(`PUT request to /user/${userId}/products/${productId}/update successful. ` + new Date().toLocaleTimeString())
        }
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* CHAT (usuario autenticado) */
//Chat - GET messages.
userRouter.get('/:userId/messages', JWTAuthenticationMiddleware /*PassportAuthMiddleware*/, (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
        res.render('messages', {unitsTotal: UnitsCalculator(cart)})
        Logger.LoggerInfo.info(`GET request to /user/${userId}/messages successful. ` + new Date().toLocaleTimeString())   
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ACCOUNT SETTINGS (usuario autenticado) */
//Account settings - GET formulario de configuración de cuenta.
userRouter.get('/:userId/settings', JWTAuthenticationMiddleware /*PassportAuthMiddleware*/, (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
        res.render('accountSettings', {unitsTotal: UnitsCalculator(cart)})
        Logger.LoggerInfo.info(`GET request to /user/${userId}/settings successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Account settings - PUT modificar datos de la cuenta.
userRouter.put('/:userId/settings', JWTAuthenticationMiddleware /*PassportAuthMiddleware*/, (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
        const userData = req.body
        UserControllers.updateUserInfo(userId, userData)
        res.render('accountSettings', {
            message: 'Se guardaron tus cambios.',
            unitsTotal: UnitsCalculator(cart)
        })
        Logger.LoggerInfo.info(`PUT request to /user/${userId}/settings successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Account settings - DELETE eliminar cuenta.
userRouter.delete('/:userId/settings', JWTAuthenticationMiddleware /*PassportAuthMiddleware*/, (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
        UserControllers.deleteUserById(userId)
        //Logout con Passport
        /*
        PassportLogout(req, res)
        */

        //Logout con JWT
        JWTLogout()
        Logger.LoggerInfo.info(`DELETE request to /user/${userId}/settings successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* COMPRAR (usuario autenticado) */
//Página de compra - GET formulario de compra.
userRouter.get('/:userId/shop/form', JWTAuthenticationMiddleware /*PassportAuthMiddleware*/, (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
        res.render('cartForm', {unitsTotal: UnitsCalculator(cart)})
        Logger.LoggerInfo.info(`GET request to /user/${userId}/shop/form successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

//Página de compra - POST procesar datos de compra.
userRouter.post('/:userId/shop/form', JWTAuthenticationMiddleware /*PassportAuthMiddleware*/, (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
        const cartData = UserControllers.getProductsInCart(userId)
        const purchaseFormData = req.body
        cartData.cart.forEach(product => {
            const productId = product.idNumber
            const subtraction = product.productQuantity
            const currentStock = ProductControllers.getProductById(productId).productStock
            const updatedStock = currentStock - subtraction
            ProductControllers.updateProductInfo(productId, updatedStock)
        })
        UserControllers.emptyCart(userId)
        Logger.LoggerWarn.warn({
            clientData: purchaseFormData,
            purchaseDetail: cartData,
            unitsTotal: UnitsCalculator(cart),
            total: TotalCalculator(cart) 
        })
        sendEmail(purchaseFormData, cartData)
        res.render('cartForm', {
            message: 'Tu compra fue procesada con éxito.',
            unitsTotal: UnitsCalculator(cart)
        })
        Logger(`POST request to /user/${userId}/shop/form successful. ` + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

module.exports = {userRouter}