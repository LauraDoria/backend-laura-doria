const express = require('express');
const {Router} = express
const router = Router()
const {ProductsMongoose} = require('../DB/Mongoose/mongooseProducts')
const {ProductControllersMongoose} = require('../DB/Mongoose/mongooseProductControllers')
const {CartControllersMongoose} = require('../DB/Mongoose/mongooseCartControllers')

/*Rutas*/

//Home
router.get('/', (req, res) => {
    res.render('home')
    console.log('GET request succesful.')
})

//Chat
router.get('/chat', (req, res) => {
    res.render('chat')
    console.log('GET request succesful.')
})

//Galería de productos
router.get('/products', (req, res) => {
    res.render('gallery', {products: ProductControllersMongoose.getAllProducts()})
    console.log('GET request succesful.')
})

//Galería de productos - agregar al carrito
router.post('/products', (req, res) => {
    res.render('/cart/:id', () => {
        const cartId = parseInt(req.params.id)
        const productId = parseInt(req.body.id)
        CartControllersMongoose.addProduct(cartId, productId)
        return {productQuantity: CartControllersMongoose.getById(cartId).products.length}
    })
    console.log('POST request succesful.')
})

//Página de producto
router.get('/products/:id', (req, res) => {
    const productId = req.params.id
    res.render('product', {
        id: ProductControllersMongoose.getProductById(productId).id,
        name: ProductControllersMongoose.getProductById(productId).name,
        productType: ProductControllersMongoose.getProductById(productId).productType,
        skinType: ProductControllersMongoose.getProductById(productId).skinType,
        hairType: ProductControllersMongoose.getProductById(productId).hairType,
        function: ProductControllersMongoose.getProductById(productId).function,
        zeroWaste: ProductControllersMongoose.getProductById(productId).zeroWaste,
        price: ProductControllersMongoose.getProductById(productId).price,
        presentation: ProductControllersMongoose.getProductById(productId).presentation,
        detailThumbnail: ProductControllersMongoose.getProductById(productId).detailThumbnail,
        description: ProductControllersMongoose.getProductById(productId).description,
        instructions: ProductControllersMongoose.getProductById(productId).instructions,
        inci: ProductControllersMongoose.getProductById(productId).inci,
    })
    console.log('GET request succesful.')
})

//Formulario
router.get('/form', (req, res) => {
    if (ProductsMongoose.isAdmin === true) {
        res.render('form', {new: 'new', modify: 'modify', delete: 'delete'})
        console.log('GET request succesful.')
    } else {
        res.send('GET request denied. Request Status: 401. Unauthorized.')
        console.log('GET request denied. Request Status: 401. Unauthorized.')
    }
})

//Formulario - cargar producto
router.post('/form', (req, res) => {
    if (ProductsMongoose.isAdmin === true) {
        const newData = req.body
        res.send(ProductControllersMongoose.addNewProduct(newData))
        res.redirect('/form')
        console.log('POST request succesful.')
    } else {
        res.send('POST request denied. Request Status: 401. Unauthorized.')
        console.log('POST request denied. Request Status: 401. Unauthorized.')
    }
})

//Formulario - modificar producto
router.put('/form', (req, res) => {
    if (ProductsMongoose.isAdmin === true) {
        const productId = req.body.id
        if (productId !== '') {
            const updatedData = req.body
            res.render('form', () => {
                ProductControllersMongoose.updateProduct(parseInt(productId), updatedData)
                const message = 'Información del producto actualizada correctamente.'
                console.log('PUT request succesful.')
                return {message: message}
            } )
        }
    } else {
        const message = 'PUT request denied. Request Status: 401. Unauthorized.'
        res.render({message: message})
        console.log('PUT request denied. Request Status: 401. Unauthorized.')
    }
})

//Formulario - eliminar producto
router.delete('/form', (req, res) => {
    if (ProductsMongoose.isAdmin === true) {
        const productId = req.body.id
        if (productId !== '') {
            res.render('form', () => {
                ProductControllersMongoose.deleteProductById(parseInt(productId))
                const message = 'Información del producto actualizada correctamente.'
                console.log('DELETE request succesful.')
                return {message: message}
            } )
        }
    } else {
        const message = 'DELETE request denied. Request Status: 401. Unauthorized.'
        res.render({message: message})
        console.log('DELETE request denied. Request Status: 401. Unauthorized.')
    }
})

//Carrito
router.get('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', {
        products: CartControllersMongoose.getById(cartId).products,
        quantity: CartControllersMongoose.getById(cartId).products.length
    })
    console.log('GET request succesful.')
})

//Carrito - vaciar carrito
router.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', () => {
        CartControllersMongoose.empty(cartId)
        return {products: CartControllersMongoose.getById(cartId).products}
    })
    console.log('DELETE request succesful.')
})

//Carrito - eliminar producto del carrito
router.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    const productId = parseInt(req.body.id)
    res.render('cart', () => {
        CartControllersMongoose.deleteProduct(cartId, productId)
        return {products: cartControllersMariaDB.getById(cartId).products}
    })
    console.log('DELETE request succesful.')
})

//Otras rutas
router.get('*', (req, res) => {
    res.render('notFound')
    console.log('GET request unsuccesful. Request status: 404. Not found.')
})

module.exports = router