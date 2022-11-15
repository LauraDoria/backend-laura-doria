const admin = require('firebase-admin')
const db = admin.firestore()
const queryCarts = db.collection('shoppingCarts')
const queryProducts = db.collection('productsRaw')
const Logger = require('../../../SRC/Utils/Logger')

class ContenedorFirebase {
        //Get
        fetchProductDatabase() {
            let doc = queryProducts.doc()
        }
        fetchProductById() {
            const doc = queryProducts.doc(`${productId}`)
        }
        fetchCartDatabase() {
            
        }
        //Save
        async updateProductDatabase() {
            await doc.create(newProduct)
        }
        updateCartDatabase() {
            
        }

    //Obtener producto
    async getById(productId) {
        try {
            
            const item = await doc.get()
            const response = item.data()
            return response
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        }
    }

    //Obtener todos los productos
    async getAll() {
        try {
            const querySnapshot = await queryProducts.get()
            let docs = querySnapshot.docs
            const response = docs.map((doc) => {
                products.push(...products, doc.data())
                return products
            })
            return response
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        }
    }



    //Actualizar producto
    async update(productId, updatedData) {
        try {
            const doc = queryProducts.doc(`${productId}`)
            let item = await doc.update({
                productCode: updatedData.productCode,
                stock: updatedData.productStock,
                name: updatedData.productName,
                productType: updatedData.productType,
                skinType: updatedData.productSkinType,
                hairType: updatedData.productHairType,
                use: updatedData.productFunction,
                zeroWaste: updatedData.ProductZeroWaste,
                price: updatedData.productPrice,
                presentation: updatedData.productPresentation,
                thumbnail: updatedData.productThumbnail,
                detailThumbnail: updatedData.productThumbnailBig,
                description: updatedData.productDescription,
                instructions: updatedData.productInstructions,
                inci: updatedData.productInci
            })
            Logger.Logger.LoggerInfo.info('INFO: Se actualizó la información de un producto. ' + new Date().toLocaleTimeString())
            return 'Se actualizó la información de un producto.'
        } catch (error) {
            console.error(error)
        }
    }

    //Eliminar producto
    async deleteById(productId) {
        try {
            const doc = queryProducts.doc(`${productId}`)
            const item = await doc.delete()
            Logger.Logger.LoggerInfo.info('INFO: Se eliminó un producto del listado. ' + new Date().toLocaleTimeString())
            return 'Se eliminó un producto.'
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        }
    }

    //Eliminar todos los productos
    async deleteAll () {
        try {
            const querySnapshot = await queryProducts.get()
            let docs = querySnapshot.docs
            docs.map((doc) => {
                doc.delete()
            })
            Logger.Logger.LoggerInfo.info('INFO: Se eliminó el listado de productos. ' + new Date().toLocaleTimeString())
            return 'Se eliminó el listado de productos.'
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        }
    }

    //Crear nuevo carrito
    async createCart() {
        try {
            let doc = queryCarts.doc()
            const newCart = await doc.create({
                timestamp: new Date().toLocaleTimeString(),
                products: []
            })
            Logger.Logger.LoggerInfo.info('INFO: Se creó un nuevo carrito de compras. ' + new Date().toLocaleTimeString())
            return newCart
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        }
    }

    //Agregar producto al carrito
    async addToCart(cartId, productId) {
        try {
            const newProduct = ProductsFirebase.getById(productId)
            const doc = queryCarts.doc(`${cartId}`)
            const cart = await doc.get()
            if (cart.exists) {
                const newCart = []
                newCart.push(...cart.products, newProduct)
                await cart.update({products: newCart})
                Logger.Logger.LoggerInfo.info('INFO: Se agregó un producto al carrito. ' + new Date().toLocaleTimeString())
                return 'Se agregó un producto al carrito.'
            } else {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el carrito. ' + new Date().toLocaleTimeString())
                return 'No se encontró el carrito.'
            }
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        }
    }

    //Obtener carrito
    async getCart(cartId) {
        try {
            const doc = queryCarts.doc(`${cartId}`)
            const cart = await doc.get()
            if (cart.exists) {
                const response = cart.data()
                return response
            } else {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el carrito. ' + new Date().toLocaleTimeString())
                return 'No se encontró el carrito.'
            }  
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        }
    }

    //Eliminar producto del carrito
    async deleteFromCart(cartId, productId) {
        try {
            const doc = queryCarts.doc(`${cartId}`)
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
                Logger.Logger.LoggerInfo.info('INFO: Se eliminó un producto de tu carrito. ' + new Date().toLocaleTimeString())
                return 'Se eliminó un producto de tu carrito.'
            } else {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el carrito. ' + new Date().toLocaleTimeString())
                return 'No se encontró el carrito.'
            } 
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        }
    }

    //Vaciar el carrito
    async emptyCart(cartId) {
        try {
            const doc = queryCarts.doc(`${cartId}`)
            const cart = await doc.get()
            if (cart.exists) {
                await cart.update({products: []})
                Logger.Logger.LoggerInfo.info('INFO: Tu carrito está vacío. ' + new Date().toLocaleTimeString())
                return 'Tu carrito está vacío.'
            } else {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el carrito. ' + new Date().toLocaleTimeString())
                return 'No se encontró el carrito.'
            }
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        }
    }

    //Eliminar un carrito
    async deleteCart(cartId) {
        try {
            const doc = queryCarts.doc(`${cartId}`)
            const cart = await doc.get()
            if (cart.exists) {
                await cart.delete()
                Logger.Logger.LoggerInfo.info('INFO: Se eliminó un carrito. ' + new Date().toLocaleTimeString())
                return 'Se eliminó un carrito.'
            } else {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el carrito. ' + new Date().toLocaleTimeString())
                return 'No se encontró el carrito.'
            }
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        }
    }
}

export default ContenedorFirebase
