import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
})

const productSchema = new mongoose.Schema({
    displayOrder: {type: Number, required: true},
    productCode: {type: String, required: true},
    stock: {type: Number, required: true},
    name: {type: String, required: true},
    productType: {type: String, required: true},
    skinType: {type: String, required: true},
    hairType: {type: String, required: true},
    function: {type: String, required: true},
    zeroWaste: {type: String, required: true},
    price: {type: Number, required: true},
    presentation: {type: String, required: true},
    thumbnail: {type: String, required: true},
    detailThumbnail: {type: String, required: true},
    description: {type: String, required: true},
    instructions: {type: String, required: true},
    inci: {type: String, required: true}
})

const cartSchema = new mongoose.Schema({
    timestamp: {type: Date, required: true},
    products: {type: Array, required: true},
})

const User = mongoose.Model('users', userSchema)
const Product = mongoose.Model('productsRaw', productSchema)
const Cart = mongoose.Model('shoppingCarts', cartSchema)

export const mongooseSchemas = { User, Product, Cart }