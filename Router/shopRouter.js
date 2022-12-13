import { Logger } from "../SRC/Utils/Logger"
import ProductControllers from '../Controllers/ProductControllers'
import { Router } from "express"
import UserControllers from "../Controllers/UserControllers"

const shopRouter = Router()

//Rutas
//Galería de productos
shopRouter.get('/products', (req, res) => {
    ProductControllers.getAllProducts()
    res.render('productGallery')
    Logger.Logger.LoggerInfo.info('GET request to /products successful.' + new Date().toLocaleTimeString())
})

//Página de producto
shopRouter.get('/products/:id', (req, res) => {
    ProductControllers.getProductById()
    res.render('productPage')
    Logger.Logger.LoggerInfo.info('GET request to /products/:id successful.' + new Date().toLocaleTimeString())
})

//Página de producto - PUT agregar al carrito/modificar cantidad
shopRouter.put('/products/:id', (req, res) => {
    UserControllers.addProductToCart()
    UserControllers.updateProductInCart()
    Logger.Logger.LoggerInfo.info('PUT request to /products/:id successful.' + new Date().toLocaleTimeString())
})

export default shopRouter
/*
//Galería de productos
shopRouter.get('/products', (req, res) => {
    res.render('gallery', {products: ProductControllers.default.getAllProducts()})
    Logger.Logger.LoggerInfo.info('GET /products request successful.' + new Date().toLocaleTimeString())
})

//Galería de productos - agregar al carrito
shopRouter.post('/products', (req, res) => {
    
    res.render('/cart/:id', () => {
        const cartId = parseInt(req.params.id)
        const productId = parseInt(req.body.id)
        MongoCartDAO.addProduct(cartId, productId)
        return {productQuantity: UserControllers.addProductToCart()}
    })
    Logger.Logger.LoggerInfo.info('POST /products request successful.' + new Date().toLocaleTimeString())
})

//Página de producto
shopRouter.get('/products/:id', (req, res) => {
    const productId = req.params.id
    res.render('product', {
        id: ProductControllers.default.getProductById(productId).idNumber,
        name: ProductControllers.default.getProductById(productId).name,
        productType: ProductControllers.default.getProductById(productId).productType,
        skinType: ProductControllers.default.getProductById(productId).skinType,
        hairType: ProductControllers.default.getProductById(productId).hairType,
        function: ProductControllers.default.getProductById(productId).function,
        zeroWaste: ProductControllers.default.getProductById(productId).zeroWaste,
        price: ProductControllers.default.getProductById(productId).price,
        presentation: ProductControllers.default.getProductById(productId).presentation,
        detailThumbnail: ProductControllers.default.getProductById(productId).detailThumbnail,
        description: ProductControllers.default.getProductById(productId).description,
        instructions: ProductControllers.default.getProductById(productId).instructions,
        inci: ProductControllers.default.getProductById(productId).inci,
    })
    Logger.Logger.LoggerInfo.info('GET /products/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito
shopRouter.get('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', {
        products: ,
        quantity: 
    })
    Logger.Logger.LoggerInfo.info('GET /cart/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito - vaciar carrito
shopRouter.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', () => {
        MongoCartDAO.empty(cartId)
        return {products: }
    })
    Logger.Logger.LoggerInfo.info('DELETE /cart/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito - eliminar producto del carrito
shopRouter.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    const productId = parseInt(req.body.id)
    res.render('cart', () => {
        MongoCartDAO.deleteProduct(cartId, productId)
        return {products: }
    })
    Logger.Logger.LoggerInfo.info('DELETE /cart/:id request successful.' + new Date().toLocaleTimeString())
})
*/