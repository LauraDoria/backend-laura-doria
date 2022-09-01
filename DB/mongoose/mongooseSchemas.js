import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    displayOrder: {type: integer, required: true},
    productCode: {type: String, required: true, max: 10},
    stock: {type: integer, required: true},
    name: {type: String, required: true, max: 150},
    productType: {type: String, required: true, max: 20},
    skinType: {type: String, required: true, max: 20},
    hairType: {type: String, required: true, max: 20},
    function: {type: String, required: true, max: 20},
    zeroWaste: {type: String, required: true, max: 2},
    price: {type: integer, required: true},
    quantity: {type: String, required: true, max: 20},
    thumbnail: {type: String, required: true, max: 200},
    detailThumbnail: {type: String, required: true, max: 200},
    description: {type: String, required: true, max: 500},
    instructions: {type: String, required: true, max: 500},
    inci: {type: String, required: true, max: 500}
})

const cartSchema = new mongoose.Schema({
    timestamp: {type: String, required: true, max: 50},
    products: {type: Array, required: true},
})

const chatSchema = new mongoose.Schema({
    user: {type: String, required: true, max: 50},
    message: {type: String, required: true, max: 500},
    date: {type: String, required: true, max: 50}
})

const Product = mongoose.Model('products', productSchema)
const Cart = mongoose.Model('carts', cartSchema)
const Chat = mongoose.Model('chats', chatSchema)

export const mongooseSchemas = { Product, Cart, Chat }