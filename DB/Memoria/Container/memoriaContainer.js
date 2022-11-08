const Logger = require('../../../utils/logger')

let productList = []
let cartList = []

class MemoriaContainer {
    //Obtener mayor id guardada
    idCompare(data) {
        let currentMaxId = 0
        let idsToCompare = []
        data.forEach(element => {
            idsToCompare.push(element.id)
            if(idsToCompare.length == 0) {
                currentMaxId = 0
            } else {
                currentMaxId = Math.max(...idsToCompare)
            }
            return currentMaxId
        })
        return currentMaxId
    }

    //Guardar nuevo producto
    save(newData) {
        const newProductId = idCompare(productList) + 1
        const newProduct = {
            id: newProductId,
            productCode: newData.productCode,
            stock: newData.productStock,
            name: newData.productName,
            productType: newData.productType,
            skinType: newData.productSkinType,
            hairType: newData.productHairType,
            function: newData.productFunction,
            zeroWaste: newData.ProductZeroWaste,
            price: newData.productPrice,
            presentation: newData.productPresentation,
            thumbnail: newData.productThumbnail,
            detailThumbnail: newData.productThumbnailBig,
            description: newData.productDescription,
            instructions: newData.productInstructions,
            inci: newData.productInci
        }
        productList = [...productList, newProduct]
        Logger.Logger.LoggerInfo.info('INFO: Se agregó un producto al listado. ' + new Date().toLocaleTimeString())
        return productList
    }

    //Obtener producto
    getById(id) {
        if (productList.length == 0){
            Logger.Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
            return 'No se encontraron productos.'
        } else {
            let requestedProduct = productList.find(element => element.id == id)
            if(requestedProduct != null) {
                return requestedProduct
            } else {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el producto. ' + new Date().toLocaleTimeString())
                return 'No se encontró el producto.'
            }
        }
    }

    //Obtener todos los productos
    getAll() {
        if (productList.length == 0){
            Logger.Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
            return 'No se encontraron productos.'
        } else {
            return productList
        }
    }

    //Actualizar producto
    update(id, updatedData) {
        if (productList.length === 0) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
            return 'No se encontraron productos.'
        } else {
            const product = getById(id)
            if (product.id == null) {
                const newProduct = save(updatedData)
                productList = [...productList, newProduct]
                Logger.Logger.LoggerInfo.info('INFO: Se agregó un producto al listado. ' + new Date().toLocaleTimeString())
                return productList
            } else {
                deleteById(id)
                const updatedProduct = save(updatedData)
                productList = [...productList, updatedProduct]
                Logger.Logger.LoggerInfo.info('INFO: Se actualizó la información de un producto. ' + new Date().toLocaleTimeString())
                return productList
            }
        }
    }

    //Eliminar producto
    deleteById(id) {
        if (productList.length === 0) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
            return 'No se encontraron productos.'
        } else {
            const product = getById(id)
            productList.splice(product, 1)
            productList = [...productList]
            Logger.Logger.LoggerInfo.info('INFO: Se eliminó un producto del listado. ' + new Date().toLocaleTimeString())
            return productList
        }
    }

    //Eliminar todos los productos
    deleteAll() {
        productList = []
        Logger.Logger.LoggerInfo.info('INFO: Se eliminó el listado de productos. ' + new Date().toLocaleTimeString())
        return 'No hay productos para mostrar.'
    }

    //Crear nuevo carrito
    createCart() {
        const cartId = idCompare(cartList) + 1
        const newCart = {
            id: cartId,
            timestamp: new Date().toLocaleTimeString(),
            products: [],
        }
        cartList = [...cartList, newCart]
        Logger.Logger.LoggerInfo.info('INFO: Se creó un nuevo carrito de compras. ' + new Date().toLocaleTimeString())
        return cartList
    }

    //Agregar producto al carrito
    addToCart(cartId, productId) {
        const requestedCart = getCart(cartId)
        const productsInCart = []
        requestedCart.products.forEach(product => {
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
        cartList = [...cartList, updatedCart]
        Logger.Logger.LoggerInfo.info('INFO: Se agregó un producto al carrito. ' + new Date().toLocaleTimeString())
        return cartList
    }

    //Obtener carrito
    getCart(cartId) {
        let requestedCart = cartList.find(cart => cart.id == cartId)
        if (requestedCart == null) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontraró el carrito. ' + new Date().toLocaleTimeString())
            return 'No se encontraró el carrito.'
        } else {
            return requestedCart
        }
    }

    //Eliminar producto del carrito
    deleteFromCart(cartId, productId) {
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
        cartList = [...cartList, updatedCart]
        Logger.Logger.LoggerInfo.info('INFO: Se eliminó un producto de tu carrito. ' + new Date().toLocaleTimeString())
        return cartList
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
        cartList = [...cartList, updatedCart]
        Logger.Logger.LoggerInfo.info('INFO: Tu carrito está vacío. ' + new Date().toLocaleTimeString())
        return cartList
    }

    //Eliminar un carrito
    deleteCart(id) {
        if (cartList.length === 0) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontraron carritos. ' + new Date().toLocaleTimeString())
            return 'No se encontraron carritos.'
        } else {
            const cart = getCart(id)
            cartList.splice(cart, 1)
            Logger.Logger.LoggerInfo.info('INFO: Se eliminó un carrito. ' + new Date().toLocaleTimeString())
            return cartList
        }
    }
}

export default MemoriaContainer