const { Router } = require('express')
const CartControllers = require('../Controllers/CartControllers')
const ProductControllers = require('../Controllers/ProductControllers')
const Logger = require('../SRC/Utils/Logger')

const shopRouter = Router()

//Rutas

//Galería de productos
shopRouter.get('/products', (req, res) => {
    res.render('gallery', {products: /*ProductControllers.getAllProducts()*/''})
    Logger.Logger.LoggerInfo.info('GET /products request successful.' + new Date().toLocaleTimeString())
})

//Galería de productos - agregar al carrito
shopRouter.post('/products', (req, res) => {
    
    res.render('/cart/:id', () => {
        const cartId = parseInt(req.params.id)
        const productId = parseInt(req.body.id)
        MongoCartDAO.addProduct(cartId, productId)
        return {productQuantity: /*CartControllers.getCartById(cartId).products.length*/''}
    })
    Logger.Logger.LoggerInfo.info('POST /products request successful.' + new Date().toLocaleTimeString())
})

//Página de producto
shopRouter.get('/products/:id', (req, res) => {
    const productId = req.params.id
    res.render('product', {
        id: /*ProductControllers.getProductById(productId).id*/'',
        name: /*ProductControllers.getProductById(productId)name*/'',
        productType: /*ProductControllers.getProductById(productId).productType*/'',
        skinType: /*ProductControllers.getProductById(productId).skinType*/'',
        hairType: /*ProductControllers.getProductById(productId).hairType*/'',
        function: /*ProductControllers.getProductById(productId).function*/'',
        zeroWaste: /*ProductControllers.getProductById(productId).zeroWaste*/'',
        price: /*ProductControllers.getProductById(productId).price*/'',
        presentation: /*ProductControllers.getProductById(productId).presentation*/'',
        detailThumbnail: /*ProductControllers.getProductById(productId).detailThumbnail*/'',
        description: /*ProductControllers.getProductById(productId).description*/'',
        instructions: /*ProductControllers.getProductById(productId).instructions*/'',
        inci: /*ProductControllers.getProductById(productId).inci*/'',
    })
    Logger.Logger.LoggerInfo.info('GET /products/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito
shopRouter.get('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', {
        products: /*CartControllers.getCartById(cartId).products*/'',
        quantity: /*CartControllers.getCartById(cartId).products.length*/''
    })
    Logger.Logger.LoggerInfo.info('GET /cart/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito - vaciar carrito
shopRouter.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', () => {
        MongoCartDAO.empty(cartId)
        return {products: /*CartControllers.getCartById(cartId).products*/''}
    })
    Logger.Logger.LoggerInfo.info('DELETE /cart/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito - eliminar producto del carrito
shopRouter.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    const productId = parseInt(req.body.id)
    res.render('cart', () => {
        MongoCartDAO.deleteProduct(cartId, productId)
        return {products: /*CartControllers.getCartById(cartId).products*/''}
    })
    Logger.Logger.LoggerInfo.info('DELETE /cart/:id request successful.' + new Date().toLocaleTimeString())
})

export default shopRouter