import express from 'express';
const {Router} = express
const productRouter = Router()
import ProductControllersTest from '../db/dao/productControllersTest'

//Galería de productos
productRouter.get('/products-test', (req, res) => {
    res.render('gallery', {products: ProductControllersTest.getAll()})
    console.log('GET request succesful.')
})

//Página de producto
productRouter.get('/products-test/:id', (req, res) => {
    const productId = req.params.id
    res.render('product', {
        id: ProductControllersTest.getById(productId).id,
        name: ProductControllersTest.getById(productId).name,
        tagProductType: ProductControllersTest.getById(productId).tagProductType,
        tag2: ProductControllersTest.getById(productId).tag2,
        tag3: ProductControllersTest.getById(productId).tag3,
        tag4: ProductControllersTest.getById(productId).tag4,
        tag5: ProductControllersTest.getById(productId).tag5,
        price: ProductControllersTest.getById(productId).price,
        presentation: ProductControllersTest.getById(productId).presentation,
        detailThumbnail: ProductControllersTest.getById(productId).detailThumbnail,
        description: ProductControllersTest.getById(productId).description,
        instructions: ProductControllersTest.getById(productId).instructions,
    })
    console.log('GET request succesful.')
})

export default productRouter