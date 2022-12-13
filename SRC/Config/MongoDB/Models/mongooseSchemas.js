import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    idNumber: {type: Number, required: true, unique: true},
    username: {type: String, required: true, max: 50, unique: true},
    name: {type: String, required: true, max: 50},
    password: {type: String, required: true, max: 20},
    email: {type: String, required: true, unique: true},
    isAdmin: {type: Boolean, required: true, default: false},
    cart: {type: Array, required: true}
})

const productSchema = new mongoose.Schema({
    idNumber: {type: Number, required: true, unique: true},
    productCode: {type: String, required: true, unique: true},
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

const User = mongoose.Model('users', userSchema)
const Product = mongoose.Model('productsRaw', productSchema)

export const mongooseSchemas = { User, Product }