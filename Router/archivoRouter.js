const { Router } = require('express')
const ArchivoCartDAO = require('../DB/Archivo/DAO/Cart/archivoCartDAO')
const ArchivoProductDAO = require('../DB/Archivo/DAO/Product/archivoProductDAO')
const Logger = require('../SRC/Utils/Logger')

const archivoRouter = Router()

//Rutas

//Galería de productos
archivoRouter.get('/products', (req, res) => {
    res.render('gallery', {products: ArchivoProductDAO.getAll()})
    Logger.Logger.LoggerInfo.info('GET /products request successful.' + new Date().toLocaleTimeString())
})

//Galería de productos - agregar al carrito NO
archivoRouter.post('/products', (req, res) => {
    
    res.render('/cart/:id', () => {
        const cartId = parseInt(req.params.id)
        const productId = parseInt(req.body.id)
        ArchivoCartDAO.addProduct(cartId, productId)
        return {productQuantity: ArchivoCartDAO.getById(cartId).products.length}
    })
    Logger.Logger.LoggerInfo.info('POST /products request successful.' + new Date().toLocaleTimeString())
})

//Página de producto
archivoRouter.get('/products/:id', (req, res) => {
    const productId = req.params.id
    res.render('product', {
        id: ArchivoProductDAO.getProductById(productId).id,
        name: ArchivoProductDAO.getProductById(productId).name,
        productType: ArchivoProductDAO.getProductById(productId).productType,
        skinType: ArchivoProductDAO.getProductById(productId).skinType,
        hairType: ArchivoProductDAO.getProductById(productId).hairType,
        function: ArchivoProductDAO.getProductById(productId).function,
        zeroWaste: ArchivoProductDAO.getProductById(productId).zeroWaste,
        price: ArchivoProductDAO.getProductById(productId).price,
        presentation: ArchivoProductDAO.getProductById(productId).presentation,
        detailThumbnail: ArchivoProductDAO.getProductById(productId).detailThumbnail,
        description: ArchivoProductDAO.getProductById(productId).description,
        instructions: ArchivoProductDAO.getProductById(productId).instructions,
        inci: ArchivoProductDAO.getProductById(productId).inci,
    })
    Logger.Logger.LoggerInfo.info('GET /products/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito
archivoRouter.get('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', {
        products: ArchivoCartDAO.getById(cartId).products,
        quantity: ArchivoCartDAO.getById(cartId).products.length
    })
    Logger.Logger.LoggerInfo.info('GET /cart/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito - vaciar carrito
archivoRouter.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', () => {
        ArchivoCartDAO.empty(cartId)
        return {products: ArchivoCartDAO.getById(cartId).products}
    })
    Logger.Logger.LoggerInfo.info('DELETE /cart/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito - eliminar producto del carrito
archivoRouter.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    const productId = parseInt(req.body.id)
    res.render('cart', () => {
        ArchivoCartDAO.deleteProduct(cartId, productId)
        return {products: ArchivoCartDAO.getById(cartId).products}
    })
    Logger.Logger.LoggerInfo.info('DELETE /cart/:id request successful.' + new Date().toLocaleTimeString())
})

export default archivoRouter