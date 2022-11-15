const mongoose =  require('mongoose')
const {mongooseSchemas} = require('../Models/mongooseSchemas')
const Logger = require('../../../Utils/logger')

class MongoDBContainer {
    //Get
    async fetchProductDatabase() {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        return await productsRaw.find().sort({displayOrder: 1}).pretty
    }
    async fetchProductById(productId) {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        return await productsRaw.findOne({_id: productId}).pretty
    }
    async fetchCartDatabase() {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        return await shoppingCarts.find().sort({displayOrder: 1}).pretty
    }
    async fetchCartById(cartId) {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        return await shoppingCarts.findOne({_id: cartId}).pretty
    }
    //Save
    async newProduct() {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        new mongooseSchemas.Product(productData)
    }
    async newCart() {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        new mongooseSchemas.Cart(cartData)
    }
    //Update
    async updateProduct(productId) {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        await productsRaw.updateOne({_id: productId}, {updatedProduct})
    }
    async updateCart(cartId) {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        await shoppingCarts.updateOne({_id: cartId}, {updatedCart})
    }
    //Delete
    async deleteProductById(productId) {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        await productsRaw.findOneAndDelete({_id: productId})
    }
    async deleteProductList() {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        await productsRaw.remove({})
    }
    async deleteCart(cartId) {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        await shoppingCarts.findOneAndDelete({_id: cartId})
    }
    async deleteCartList() {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        await shoppingCarts.remove({})
    }
    //Disconnect
    async disconnect() {
        mongoose.disconnect()
    }
}

export default MongoDBContainer
