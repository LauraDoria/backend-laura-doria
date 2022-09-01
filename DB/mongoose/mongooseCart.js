import mongoose from 'mongoose'
import {mongooseSchemas} from './mongooseSchemas'
import {ProductsMongoose} from './mongooseProducts'

//Crear nuevo carrito
const createCart = () => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to mongoose.')
        const cartData = {
            timestamp: new Date().toLocaleTimeString(),
            products: [],
        }
        const newCart = new mongooseSchemas.Cart(cartData)
        console.log('Se creó un nuevo carrito de compras.');
        return newCart
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
}

//Agregar producto al carrito
const addToCart = (cartId, productId) => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to mongoose.')
        const currentCart = getCart(cartId).products
        const newProduct = ProductsMongoose.getById(productId)
        const newCart = [...currentCart, newProduct]
        await shoppingCarts.updateOne({_id: cartId}, {$set: {products: newCart}})
        console.log('Se agregó un producto al carrito.');
        return newCart
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
}

//Obtener carrito
const getCart = (cartId) => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to mongoose.')
        const requestedCart = await shoppingCarts.findOne({_id: cartId}).pretty
        if (requestedCart === null) {
            console.log('No se encontró el carrito.')
            return null
        } else {
            return JSON.parse(requestedCart)
        }
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
}

//Eliminar producto del carrito
const deleteFromCart = (cartId, productId) => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to mongoose.')
        const cartToUpdate = getCart(cartId)
        if (cartToUpdate === null) {
            return 'No se encontró el carrito.'
        } else {
            const newCart = []
            const updatedCart = getCart(cartId).products.forEach((product) => {
                if (product._id != productId) {
                    newCart.push(product)
                }
                return newCart
            })
            await shoppingCarts.updateOne({_id: productId}, {$set: {products: updatedCart}})
            return 'Se eliminó un producto.'
        }
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
}

//Vaciar el carrito
const emptyCart = (cartId) => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to mongoose.')
        const cartToEmpty = getCart(cartId)
        if (cartToEmpty === null) {
            return 'No se encontró el carrito.'
        } else {
            const emptyCart = []
            await shoppingCarts.updateOne({_id: cartId}, {$set: {products: emptyCart}})
            return 'Tu carrito está vacío.'
        }
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
}

//Eliminar un carrito
const deleteCart = (cartId) => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to mongoose.')
        const cartToDelete = getCart(cartId)
        if (cartToDelete === null) {
            return 'No se encontró el carrito.'
        } else {
            await shoppingCarts.findOneAndDelete({_id: cartId})
            return 'Se eliminó un carrito.'
        }
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
}

export const CartsMongoose = { createCart, addToCart, getCart, deleteFromCart, emptyCart, deleteCart }
