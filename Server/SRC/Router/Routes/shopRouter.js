//const {JWTAuthenticationMiddleware} = require('../../Middlewares/JWTAuthMiddleware')
const {Logger} = require('../../Utils/Logger')
const {ProductControllers} = require('../../Controllers/ProductControllers')
const {Router} = require('express')

const shopRouter = Router()

/* RUTAS */////////////////////////////////////////////////////////////////////////////

/* GALERÍA DE PRODUCTOS (no usuario autenticado) */
//Galería de productos - GET galería de productos.
shopRouter.get('/products/gallery', (req, res) => {
    try {
        res.render('productGallery', { gallery: ProductControllers.getAllProducts() })
        Logger.LoggerInfo.info('GET request to /shop/products/gallery successful. ' + new Date().toLocaleTimeString())
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* PÁGINA DE PRODUCTO (no usuario autenticado) */
//Página de producto - GET página de producto.
shopRouter.get('/products/:productId', (req, res) => {
    try {
        const isAuth = localStorage.getItem('isAuth')
        if (isAuth == 'YES') {
            res.redirect('user/:userId/shop/products/:productId')
        } else {
            const productId = parseInt(req.params.productId)
            res.render('productPage', {
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
                inci: ProductControllers.getProductById(productId).inci
            })
            Logger.LoggerInfo.info(`GET request to /shop/products/${productId} successful. ` + new Date().toLocaleTimeString())
        }
            
    } catch (error) {
        Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
    }
})

module.exports = {shopRouter}