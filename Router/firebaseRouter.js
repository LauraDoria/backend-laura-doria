const { Router } = require('express')
const FirebaseCartDAO = require('../DB/Firebase/DAO/Cart/firebaseCartDAO')
const FirebaseProductDAO = require('../DB/Firebase/DAO/Product/firebaseProductDAO')
const Logger = require('../SRC/Utils/Logger')

const firebaseRouter = Router()

//Rutas

//Galería de productos
firebaseRouter.get('/products', (req, res) => {
    res.render('gallery', {products: FirebaseProductDAO.getAllProducts()})
    Logger.Logger.LoggerInfo.info('GET /products request successful.' + new Date().toLocaleTimeString())
})

//Galería de productos - agregar al carrito
firebaseRouter.post('/products', (req, res) => {
    
    res.render('/cart/:id', () => {
        const cartId = parseInt(req.params.id)
        const productId = parseInt(req.body.id)
        FirebaseCartDAO.addProduct(cartId, productId)
        return {productQuantity: FirebaseCartDAO.getById(cartId).products.length}
    })
    Logger.Logger.LoggerInfo.info('POST /products request successful.' + new Date().toLocaleTimeString())
})

//Página de producto
firebaseRouter.get('/products/:id', (req, res) => {
    const productId = req.params.id
    res.render('product', {
        id: FirebaseProductDAO.getProductById(productId).id,
        name: FirebaseProductDAO.getProductById(productId).name,
        productType: FirebaseProductDAO.getProductById(productId).productType,
        skinType: FirebaseProductDAO.getProductById(productId).skinType,
        hairType: FirebaseProductDAO.getProductById(productId).hairType,
        function: FirebaseProductDAO.getProductById(productId).function,
        zeroWaste: FirebaseProductDAO.getProductById(productId).zeroWaste,
        price: FirebaseProductDAO.getProductById(productId).price,
        presentation: FirebaseProductDAO.getProductById(productId).presentation,
        detailThumbnail: FirebaseProductDAO.getProductById(productId).detailThumbnail,
        description: FirebaseProductDAO.getProductById(productId).description,
        instructions: FirebaseProductDAO.getProductById(productId).instructions,
        inci: FirebaseProductDAO.getProductById(productId).inci,
    })
    Logger.Logger.LoggerInfo.info('GET /products/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito
firebaseRouter.get('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', {
        products: FirebaseCartDAO.getById(cartId).products,
        quantity: FirebaseCartDAO.getById(cartId).products.length
    })
    Logger.Logger.LoggerInfo.info('GET /cart/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito - vaciar carrito
firebaseRouter.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', () => {
        FirebaseCartDAO.empty(cartId)
        return {products: FirebaseCartDAO.getById(cartId).products}
    })
    Logger.Logger.LoggerInfo.info('DELETE /cart/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito - eliminar producto del carrito
firebaseRouter.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    const productId = parseInt(req.body.id)
    res.render('cart', () => {
        FirebaseCartDAO.deleteProduct(cartId, productId)
        return {products: FirebaseCartDAO.getById(cartId).products}
    })
    Logger.Logger.LoggerInfo.info('DELETE /cart/:id request successful.' + new Date().toLocaleTimeString())
})

export default firebaseRouter