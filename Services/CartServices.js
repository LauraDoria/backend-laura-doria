const Logger = require('../SRC/Utils/Logger')
const DBConnect = require('../SRC/Config/config')
const IdCompare = require('../SRC/Utils/IdCompare')
let ProductDAO = ''
if(DBConnect.Env.PERS == 'ARCHIVO') {
    ProductDAO = require('../Persistence/Archivo/DAO/Cart/archivoCartDAO')
} else if(DBConnect.Env.PERS == 'FIREBASE') {
    ProductDAO = require('../Persistence/Firebase/DAO/Cart/firebaseCartDAO')
} else if(DBConnect.Env.PERS == 'MEMORIA') {
    ProductDAO = require('../Persistence/Memoria/DAO/Cart/memoriaCartDAO')
} else {
    ProductDAO = require('../Persistence/MongoDB/DAO/Cart/mongoDBCartDAO')
}

class CartServices {
    //Crear nuevo carrito
    createCart() {
        const cartData = ''//Función fetchCartDatabase() desde CartDAO (en Mongo varía)
        const cartId =  IdCompare(cartData) + 1
        const newCart = {
            id: cartId,
            timestamp: new Date().toLocaleTimeString(),
            products: [],
        }
        const updatedCartData = [...cartData, newCart]
        //Función updateCartDatabase() desde CartDAO (en Mongo varía)
        Logger.Logger.LoggerInfo.info('INFO: Se creó un nuevo carrito de compras. ' + new Date().toLocaleTimeString())
        return newCart
    }

    //Agregar producto al carrito
    addToCart(cartId, productId) {
        const cartData = ''//Función fetchCartDatabase() desde CartDAO (en Mongo varía)
        const requestedCart = getCart(cartId)
        const productsInCart = []
        requestedCart.forEach(product => {
            productsInCart.push(product)
            return productsInCart
        })
        const newProduct = getById(productId)
        const cartTimestamp = requestedCart.timestamp
        deleteCart(cartId)
        const updatedCart = {
            id: cartId,
            timestamp: cartTimestamp,
            products: [...productsInCart, newProduct]
        }
        const updatedCartData = [...cartData, updatedCart]
        //Función updateCartDatabase() desde CartDAO (en Mongo varía)
        Logger.Logger.LoggerInfo.info('INFO: Se agregó un producto al carrito. ' + new Date().toLocaleTimeString())
        return updatedCart
    }

    //Obtener carrito
    getCart(cartId) {
        const cartData = ''//Función fetchCartDatabase() desde CartDAO (en Mongo varía)
        let requestedCart = cartData.find(cart => cart.id == cartId)
        if (requestedCart == null) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontraró el carrito. ' + new Date().toLocaleTimeString())
            return 'No se encontraró el carrito.'
        } else {
            return requestedCart
        }
    }

    //Eliminar producto del carrito
    deleteFromCart(cartId, productId) {
        const cartData = ''//Función fetchCartDatabase() desde CartDAO (en Mongo varía)
        const requestedCart = getCart(cartId)
        const cartTimestamp = requestedCart.timestamp
        const updatedProductList = []
        requestedCart.products.forEach(product => {
            if (product.id !== productId) updatedProductList.push(product)
            return updatedProductList
        })
        deleteCart(cartId)
        const updatedCart = {
            id: cartId,
            timestamp: cartTimestamp,
            products: updatedProductList
        }
        const updatedCartData = [...cartData, updatedCart]
        //Función updateCartDatabase() desde CartDAO (en Mongo varía)
        Logger.Logger.LoggerInfo.info('INFO: Se eliminó un producto de tu carrito. ' + new Date().toLocaleTimeString())
        return updatedCart
    }

    //Vaciar el carrito
    emptyCart(cartId) {
        const requestedCart = getCart(cartId).products
        const cartTimestamp = requestedCart.timestamp
        deleteCart(cartId)
        const updatedCart = {
            id: cartId,
            timestamp: cartTimestamp,
            products: []
        }
        const updatedCartData = [...cartData, updatedCart]
        //Función updateCartDatabase() desde CartDAO (en Mongo varía)
        Logger.Logger.LoggerInfo.info('INFO: Tu carrito está vacío. ' + new Date().toLocaleTimeString())
        return 'Tu carrito está vacío!'
    }

    //Eliminar un carrito
    deleteCart(id) {
        const cartData = ''//Función fetchCartDatabase() desde CartDAO (en Mongo varía)
        if (cartData.length === 0) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontraron carritos. ' + new Date().toLocaleTimeString())
            return 'No se encontraron carritos.'
        } else {
            const cart = getCart(id)
            cartData.splice(cart, 1)
            const updatedCartData = [...cartData]
            //Función updateCartDatabase() desde CartDAO (en Mongo varía)
            Logger.Logger.LoggerInfo.info('INFO: Se eliminó un carrito. ' + new Date().toLocaleTimeString())
            return updatedCartList
        }
    }
}

export default CartServices