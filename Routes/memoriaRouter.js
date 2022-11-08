const { Router } = require('express')
const MemoriaCartDAO = require('../DB/Memoria/DAO/Cart/memoriaCartDAO')
const MemoriaProductDAO = require('../DB/Memoria/DAO/Product/memoriaProductDAO')
const Logger = require('../Utils/logger')

const memoriaRouter = Router()

//Rutas

//Galería de productos
memoriaRouter.get('/products', (req, res) => {
    res.render('gallery', {products: MemoriaProductDAO.getAllProducts()})
    Logger.Logger.LoggerInfo.info('GET /products request successful.' + new Date().toLocaleTimeString())
})

//Galería de productos - agregar al carrito
memoriaRouter.post('/products', (req, res) => {
    
    res.render('/cart/:id', () => {
        const cartId = parseInt(req.params.id)
        const productId = parseInt(req.body.id)
        MemoriaCartDAO.addProduct(cartId, productId)
        return {productQuantity: MemoriaCartDAO.getById(cartId).products.length}
    })
    Logger.Logger.LoggerInfo.info('POST /products request successful.' + new Date().toLocaleTimeString())
})

//Página de producto
memoriaRouter.get('/products/:id', (req, res) => {
    const productId = req.params.id
    res.render('product', {
        id: MemoriaProductDAO.getProductById(productId).id,
        name: MemoriaProductDAO.getProductById(productId).name,
        productType: MemoriaProductDAO.getProductById(productId).productType,
        skinType: MemoriaProductDAO.getProductById(productId).skinType,
        hairType: MemoriaProductDAO.getProductById(productId).hairType,
        function: MemoriaProductDAO.getProductById(productId).function,
        zeroWaste: MemoriaProductDAO.getProductById(productId).zeroWaste,
        price: MemoriaProductDAO.getProductById(productId).price,
        presentation: MemoriaProductDAO.getProductById(productId).presentation,
        detailThumbnail: MemoriaProductDAO.getProductById(productId).detailThumbnail,
        description: MemoriaProductDAO.getProductById(productId).description,
        instructions: MemoriaProductDAO.getProductById(productId).instructions,
        inci: MemoriaProductDAO.getProductById(productId).inci,
    })
    Logger.Logger.LoggerInfo.info('GET /products/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito
memoriaRouter.get('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', {
        products: MemoriaCartDAO.getById(cartId).products,
        quantity: MemoriaCartDAO.getById(cartId).products.length
    })
    Logger.Logger.LoggerInfo.info('GET /cart/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito - vaciar carrito
memoriaRouter.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', () => {
        MemoriaCartDAO.empty(cartId)
        return {products: MemoriaCartDAO.getById(cartId).products}
    })
    Logger.Logger.LoggerInfo.info('DELETE /cart/:id request successful.' + new Date().toLocaleTimeString())
})

//Carrito - eliminar producto del carrito
memoriaRouter.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    const productId = parseInt(req.body.id)
    res.render('cart', () => {
        MemoriaCartDAO.deleteProduct(cartId, productId)
        return {products: MemoriaCartDAO.getById(cartId).products}
    })
    Logger.Logger.LoggerInfo.info('DELETE /cart/:id request successful.' + new Date().toLocaleTimeString())
})

export default memoriaRouter