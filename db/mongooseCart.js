import mongoose from 'mongoose'
import {mongooseSchemas} from './mongooseSchemas'
import {ProductsMongoose} from './mongooseProducts'

const Logger = require('../utils/logger')

//Crear nuevo carrito
const createCart = () => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        Logger.Logger.LoggerWarn.warn('WARN: Connected to mongoose. ' + new Date().toLocaleTimeString())
        const cartData = {
            timestamp: new Date().toLocaleTimeString(),
            products: [],
        }
        const newCart = new mongooseSchemas.Cart(cartData)
        Logger.Logger.LoggerInfo.info('INFO: Se creó un nuevo carrito de compras. ' + new Date().toLocaleTimeString())
        return newCart
    } catch (error) {
        Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
    } finally {
        mongoose.disconnect()
        Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
    }
}

//Agregar producto al carrito
const addToCart = (cartId, productId) => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        Logger.Logger.LoggerWarn.warn('WARN: Connected to mongoose. ' + new Date().toLocaleTimeString())
        const currentCart = getCart(cartId).products
        const newProduct = ProductsMongoose.getById(productId)
        const newCart = [...currentCart, newProduct]
        await shoppingCarts.updateOne({_id: cartId}, {$set: {products: newCart}})
        Logger.Logger.LoggerInfo.info('INFO: Se agregó un producto al carrito. ' + new Date().toLocaleTimeString())
        return newCart
    } catch (error) {
        Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
    } finally {
        mongoose.disconnect()
        Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
    }
}

//Obtener carrito
const getCart = (cartId) => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        Logger.Logger.LoggerWarn.warn('WARN: Connected to mongoose. ' + new Date().toLocaleTimeString())
        const requestedCart = await shoppingCarts.findOne({_id: cartId}).pretty
        if (requestedCart === null) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontró el carrito. ' + new Date().toLocaleTimeString())
            return null
        } else {
            return JSON.parse(requestedCart)
        }
    } catch (error) {
        Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
    } finally {
        mongoose.disconnect()
        Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
    }
}

//Eliminar producto del carrito
const deleteFromCart = (cartId, productId) => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        Logger.Logger.LoggerWarn.warn('WARN: Connected to mongoose. ' + new Date().toLocaleTimeString())
        const cartToUpdate = getCart(cartId)
        if (cartToUpdate === null) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontró el carrito. ' + new Date().toLocaleTimeString())
        } else {
            const newCart = []
            const updatedCart = getCart(cartId).products.forEach((product) => {
                if (product._id != productId) {
                    newCart.push(product)
                }
                return newCart
            })
            await shoppingCarts.updateOne({_id: productId}, {$set: {products: updatedCart}})
            Logger.Logger.LoggerInfo.info('INFO: Se eliminó un producto. ' + new Date().toLocaleTimeString())
            return 'Se eliminó un producto.'
        }
    } catch (error) {
        Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
    } finally {
        mongoose.disconnect()
        Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
    }
}

//Vaciar el carrito
const emptyCart = (cartId) => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        Logger.Logger.LoggerWarn.warn('WARN: Connected to mongoose. ' + new Date().toLocaleTimeString())
        const cartToEmpty = getCart(cartId)
        if (cartToEmpty === null) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontró el carrito. ' + new Date().toLocaleTimeString())
            return 'No se encontró el carrito.'
        } else {
            const emptyCart = []
            await shoppingCarts.updateOne({_id: cartId}, {$set: {products: emptyCart}})
            Logger.Logger.LoggerInfo.info('INFO: Tu carrito está vacío. ' + new Date().toLocaleTimeString())
            return 'Tu carrito está vacío.'
        }
    } catch (error) {
        Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
    } finally {
        mongoose.disconnect()
        Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
    }
}

//Eliminar un carrito
const deleteCart = (cartId) => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        Logger.Logger.LoggerWarn.warn('WARN: Connected to mongoose. ' + new Date().toLocaleTimeString())
        const cartToDelete = getCart(cartId)
        if (cartToDelete === null) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontró el carrito. ' + new Date().toLocaleTimeString())
            return 'No se encontró el carrito.'
        } else {
            await shoppingCarts.findOneAndDelete({_id: cartId})
            Logger.Logger.LoggerInfo.info('INFO: Se eliminó un carrito. ' + new Date().toLocaleTimeString())
            return 'Se eliminó un carrito.'
        }
    } catch (error) {
        Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
    } finally {
        mongoose.disconnect()
        Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
    }
}

export const CartsMongoose = { createCart, addToCart, getCart, deleteFromCart, emptyCart, deleteCart }
