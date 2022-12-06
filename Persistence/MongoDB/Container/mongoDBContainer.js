const mongoose =  require('mongoose')
const {mongooseSchemas} = require('../Models/mongooseSchemas')
const Logger = require('../../../Utils/logger')

class MongoDBContainer {
    constructor() {
        
    }

    //Get
    static async fetchProductDatabase() {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        return await productsRaw.find().sort({displayOrder: 1}).pretty
    }
    static async fetchProductById(productId) {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        return await productsRaw.findOne({_id: productId}).pretty
    }
    static async fetchCartDatabase() {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        return await shoppingCarts.find().sort({displayOrder: 1}).pretty
    }
    static async fetchCartById(cartId) {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        return await shoppingCarts.findOne({_id: cartId}).pretty
    }
    //Save
    static async newProduct() {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        new mongooseSchemas.Product(productData)
    }
    static async newCart() {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        new mongooseSchemas.Cart(cartData)
    }
    //Update
    static async updateProduct(productId) {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        await productsRaw.updateOne({_id: productId}, {updatedProduct})
    }
    static async updateCart(cartId) {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        await shoppingCarts.updateOne({_id: cartId}, {updatedCart})
    }
    //Delete
    static async deleteProductById(productId) {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        await productsRaw.findOneAndDelete({_id: productId})
    }
    static async deleteProductList() {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        await productsRaw.remove({})
    }
    static async deleteCart(cartId) {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        await shoppingCarts.findOneAndDelete({_id: cartId})
    }
    static async deleteCartList() {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        await shoppingCarts.remove({})
    }
    //Disconnect
    static async disconnect() {
        mongoose.disconnect()
    }
}

export default MongoDBContainer
