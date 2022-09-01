const admin = require('firebase-admin')
const db = admin.firestore()
const query = db.collection('shoppingCarts')
import {ProductsFirebase} from './firebaseProducts'

//Crear nuevo carrito
const createCart = () => {
    try {
        let doc = query.doc()
        const newCart = await doc.create({
            timestamp: new Date().toLocaleTimeString(),
            products: []
        })
        return newCart
    } catch (error) {
        console.error(error)
    }
}

//Agregar producto al carrito
const addToCart = (cartId, productId) => {
    try {
        const newProduct = ProductsFirebase.getById(productId)
        const doc = query.doc(`${cartId}`)
        const cart = await doc.get()
        if (cart.exists) {
            const newCart = []
            newCart.push(...cart.products, newProduct)
            await cart.update({products: newCart})
            return 'Se agregó un producto al carrito.'
        } else {
            return 'No se encontró el carrito.'
        }
    } catch (error) {
        console.error(error)
    }
}

//Obtener carrito
const getCart = (cartId) => {
    try {
        const doc = query.doc(`${cartId}`)
        const cart = await doc.get()
        if (cart.exists) {
            const response = cart.data()
            return response
        } else {
            return 'No se encontró el carrito.'
        }  
    } catch (error) {
        console.error(error)
    }
}

//Eliminar producto del carrito
const deleteFromCart = (cartId, productId) => {
    try {
        const doc = query.doc(`${cartId}`)
        const cart = await doc.get()
        if (cart.exists) {
            const currentCart = cart.products
            const products = []
            const updatedCart = currentCart.map((product) => {
                if (product.id != productId) {
                    products.push(product)
                }
                return products
            })
            await cart.update({products: updatedCart})
            return 'Se eliminó un producto de tu carrito.'
        } else {
            return 'No se encontró el carrito.'
        } 
    } catch (error) {
        console.error(error)
    }
}

//Vaciar el carrito
const emptyCart = (cartId) => {
    try {
        const doc = query.doc(`${cartId}`)
        const cart = await doc.get()
        if (cart.exists) {
            await cart.update({products: []})
            return 'Tu carrito está vacío.'
        } else {
            return 'No se encontró el carrito.'
        }
    } catch (error) {
        console.error(error)
    }
}

//Eliminar un carrito
const deleteCart = (cartId) => {
    try {
        const doc = query.doc(`${cartId}`)
        const cart = await doc.get()
        if (cart.exists) {
            await cart.delete()
            return 'Se eliminó un carrito.'
        } else {
            return 'No se encontró el carrito.'
        }
    } catch (error) {
        console.error(error)
    }
}

export const CartsFirebase = { createCart, addToCart, getCart, deleteFromCart, emptyCart, deleteCart }
