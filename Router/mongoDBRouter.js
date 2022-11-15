const { Router } = require('express')
const MongoCartDAO = require('../DB/MongoDB/DAO/Cart/mongoDBCartDAO')
const MongoProductDAO = require('../DB/MongoDB/DAO/Product/mongoDBProductDAO')
const Logger = require('../SRC/Utils/Logger')

const mongoDBRouter = Router()

//Rutas

//Galería de productos
mongoDBRouter.get('/products', (req, res) => {
    res.render('gallery', {products: MongoProductDAO.getAllProducts()})
    Logger.Logger.LoggerInfo.info('GET /products request successful.' + new Date().toLocaleTimeString())
})

//Galería de productos - agregar al carrito
mongoDBRouter.post('/products', (req, res) => {
    
    res.render('/cart/:id', () => {
        const cartId = parseInt(req.params.id)
        const productId = parseInt(req.body.id)
        MongoCartDAO.addProduct(cartId, productId)
        return {productQuantity: MongoCartDAO.getById(cartId).products.length}
    })
    Logger.Logger.LoggerInfo.info('POST /products request successful.' + new Date().toLocaleTimeString())
})

//Página de producto
mongoDBRouter.get('/products/:id', (req, res) => {
    const productId = req.params.id
    res.render('product', {
        id: MongoProductDAO.getProductById(productId).id,
        name: MongoProductDAO.getProductById(productId).name,
        productType: MongoProductDAO.getProductById(productId).productType,
        skinType: MongoProductDAO.getProductById(productId).skinType,
        hairType: MongoProductDAO.getProductById(productId).hairType,
        function: MongoProductDAO.getProductById(productId).function,
        zeroWaste: MongoProductDAO.getProductById(productId).zeroWaste,
        price: MongoProductDAO.getProductById(productId).price,
        presentation: MongoProductDAO.getProductById(productId).presentation,
        detailThumbnail: MongoProductDAO.getProductById(productId).detailThumbnail,
        description: MongoProductDAO.getProductById(productId).description,
        instructions: MongoProductDAO.getProductById(productId).instructions,
        inci: MongoProductDAO.getProductById(productId).inci,
    })
    Logger.Logger.LoggerInfo.info('GET /products/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito
mongoDBRouter.get('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', {
        products: MongoCartDAO.getById(cartId).products,
        quantity: MongoCartDAO.getById(cartId).products.length
    })
    Logger.Logger.LoggerInfo.info('GET /cart/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito - vaciar carrito
mongoDBRouter.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', () => {
        MongoCartDAO.empty(cartId)
        return {products: MongoCartDAO.getById(cartId).products}
    })
    Logger.Logger.LoggerInfo.info('DELETE /cart/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito - eliminar producto del carrito
mongoDBRouter.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    const productId = parseInt(req.body.id)
    res.render('cart', () => {
        MongoCartDAO.deleteProduct(cartId, productId)
        return {products: MongoCartDAO.getById(cartId).products}
    })
    Logger.Logger.LoggerInfo.info('DELETE /cart/:id request successful.' + new Date().toLocaleTimeString())
})

export default mongoDBRouter