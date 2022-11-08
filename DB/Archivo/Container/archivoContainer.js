const fs = require('fs')
const Logger = require('../../../utils/logger')

class ArchivoContainer {
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
        const productData = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
        const newProductId = idCompare(productData) + 1
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
        const newProductList = [...productData, newProduct]
        fs.writeFileSync('./products.json', JSON.stringify(newProductList, null, 2), 'utf-8')
        Logger.Logger.LoggerInfo.info('INFO: Se agregó un producto al listado. ' + new Date().toLocaleTimeString())
        return newProduct
    }

    //Obtener producto
    getById(id) {
        const productData = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
        if (productData.length == 0){
            Logger.Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
            return 'No se encontraron productos.'
        } else {
            let requestedProduct = productData.find(element => element.id == id)
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
        const productData = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
        if (productData.length == 0){
            Logger.Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
            return 'No se encontraron productos.'
        } else {
            return productData
        }
    }

    //Actualizar producto
    update(id, updatedData) {
        const productData = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
        if (productData.length === 0) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
            return 'No se encontraron productos.'
        } else {
            const product = getById(id)
            if (product.id == null) {
                const newProduct = save(updatedData)
                const updatedProductList = [...productData, newProduct]
                fs.writeFileSync('./products.json', JSON.stringify(updatedProductList, null, 2), 'utf-8')
                Logger.Logger.LoggerInfo.info('INFO: Se agregó un producto al listado. ' + new Date().toLocaleTimeString())
                return newProduct
            } else {
                deleteById(id)
                const updatedProduct = save(updatedData)
                const updatedProductList = [...productData, updatedProduct]
                fs.writeFileSync('./products.json', JSON.stringify(updatedProductList, null, 2), 'utf-8')
                Logger.Logger.LoggerInfo.info('INFO: Se actualizó la información de un producto. ' + new Date().toLocaleTimeString())
                return updatedProduct
            }
        }
    }

    //Eliminar producto
    deleteById(id) {
        const productData = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
        if (productData.length === 0) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
            return 'No se encontraron productos.'
        } else {
            const product = getById(id)
            productData.splice(product, 1)
            let updatedProductList = [...productData]
            fs.writeFileSync('./products.json', JSON.stringify(updatedProductList, null, 2), 'utf-8')
            Logger.Logger.LoggerInfo.info('INFO: Se eliminó un producto del listado. ' + new Date().toLocaleTimeString())
            return updatedProductList
        }
    }

    //Eliminar todos los productos
    deleteAll() {
        let emptyProductList = []
        fs.writeFileSync('./products.json', JSON.stringify(emptyProductList, null, 2), 'utf-8')
        Logger.Logger.LoggerInfo.info('INFO: Se eliminó el listado de productos. ' + new Date().toLocaleTimeString())
        return 'No hay productos para mostrar.'
    }

    //Crear nuevo carrito
    createCart() {
        const cartData = JSON.parse(fs.readFileSync('./cart.json', 'utf-8'))
        const cartId = idCompare(cartData) + 1
        const newCart = {
            id: cartId,
            timestamp: new Date().toLocaleTimeString(),
            products: [],
        }
        const cartDataUpdate = [...cartData, newCart]
        fs.writeFileSync('./cart.json', JSON.stringify(cartDataUpdate, null, 2), 'utf-8')
        Logger.Logger.LoggerInfo.info('INFO: Se creó un nuevo carrito de compras. ' + new Date().toLocaleTimeString())
        return newCart
    }

    //Agregar producto al carrito
    addToCart(cartId, productId) {
        const cartData = JSON.parse(fs.readFileSync('./cart.json', 'utf-8'))
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
        const cartDataUpdate = [...cartData, updatedCart]
        fs.writeFileSync('./cart.json', JSON.stringify(cartDataUpdate, null, 2), 'utf-8')
        Logger.Logger.LoggerInfo.info('INFO: Se agregó un producto al carrito. ' + new Date().toLocaleTimeString())
        return updatedCart
    }

    //Obtener carrito
    getCart(cartId) {
        const cartData = JSON.parse(fs.readFileSync('./cart.json', 'utf-8'))
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
        const cartData = JSON.parse(fs.readFileSync('./cart.json', 'utf-8'))
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
        const cartDataUpdate = [...cartData, updatedCart]
        fs.writeFileSync('./cart.json', JSON.stringify(cartDataUpdate, null, 2), 'utf-8')
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
        const cartDataUpdate = [...cartData, updatedCart]
        fs.writeFileSync('./cart.json', JSON.stringify(cartDataUpdate, null, 2), 'utf-8')
        Logger.Logger.LoggerInfo.info('INFO: Tu carrito está vacío. ' + new Date().toLocaleTimeString())
        return 'Tu carrito está vacío!'
    }

    //Eliminar un carrito
    deleteCart(id) {
        const cartData = JSON.parse(fs.readFileSync('./cart.json', 'utf-8'))
        if (cartData.length === 0) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontraron carritos. ' + new Date().toLocaleTimeString())
            return 'No se encontraron carritos.'
        } else {
            const cart = getCart(id)
            cartData.splice(cart, 1)
            let updatedCartList = [...cartData]
            fs.writeFileSync('./productos.txt', JSON.stringify(updatedCartList, null, 2), 'utf-8')
            Logger.Logger.LoggerInfo.info('INFO: Se eliminó un carrito. ' + new Date().toLocaleTimeString())
            return updatedCartList
        }
    }
}

export default ArchivoContainer