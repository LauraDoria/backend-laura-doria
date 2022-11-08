const mongoose =  require('mongoose')
const {mongooseSchemas} = require('../Models/mongooseSchemas')
const Logger = require('../../../Utils/logger')

class MongoDBContainer {
    //Guardar nuevo producto
    static async save(newData) {
        try {
            mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
            Logger.Logger.LoggerWarn.warn('WARN: Connected to mongoose. ' + new Date().toLocaleTimeString())
            const productData = {
                displayOrder: newData.displayOrder,
                productCode: newData.productCode,
                stock: newData.productStock,
                name: newData.productName,
                productType: newData.productType,
                skinType: newData.productSkinType,
                hairType: newData.productHairType,
                use: newData.productFunction,
                zeroWaste: newData.ProductZeroWaste,
                price: newData.productPrice,
                presentation: newData.productPresentation,
                thumbnail: newData.productThumbnail,
                detailThumbnail: newData.productThumbnailBig,
                description: newData.productDescription,
                instructions: newData.productInstructions,
                inci: newData.productInci
            }
            const newProduct = new mongooseSchemas.Product(productData)
            Logger.Logger.LoggerInfo.info('INFO: Se agregó un producto al listado. ' + new Date().toLocaleTimeString())
            return newProduct
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        } finally {
            mongoose.disconnect()
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    //Obtener producto
    static async getById(productId) {
        try {
            mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
            Logger.Logger.LoggerWarn.warn('WARN: Connected to mongoose. ' + new Date().toLocaleTimeString())
            const requestedProduct = await productsRaw.findOne({_id: productId}).pretty
            if (requestedProduct === null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el producto. ' + new Date().toLocaleTimeString())
                return null
            } else {
                return JSON.parse(requestedProduct)
            }
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        } finally {
            mongoose.disconnect()
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    //Obtener todos los productos
    static async getAll() {
        try {
            mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
            Logger.Logger.LoggerWarn.warn('WARN: Connected to mongoose. ' + new Date().toLocaleTimeString())
            const allProducts = await productsRaw.find().sort({displayOrder: 1}).pretty
            if (allProducts === null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
                return null
            } else {
                return JSON.parse(allProducts)
            }
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        } finally {
            mongoose.disconnect()
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    //Actualizar producto
    static async update(productId, updatedData) {
        try {
            mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
            Logger.Logger.LoggerWarn.warn('WARN: Connected to mongoose. ' + new Date().toLocaleTimeString())
            const productToUpdate = getById(productId)
            if (productToUpdate === null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el producto. ' + new Date().toLocaleTimeString())
                return 'No se encontró el producto.'
            } else {
                await productsRaw.updateOne({_id: productId}, {
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
            }
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        } finally {
            mongoose.disconnect()
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    //Eliminar producto
    static async deleteById(productId) {
        try {
            mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
            Logger.Logger.LoggerWarn.warn('WARN: Connected to mongoose. ' + new Date().toLocaleTimeString())
            const productToDelete = getById(productId)
            if (productToDelete === null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el producto. ' + new Date().toLocaleTimeString())
                return 'No se encontró el producto.'
            } else {
                await productsRaw.findOneAndDelete({_id: productId})
                Logger.Logger.LoggerInfo.info('INFO: Se eliminó un producto del listado. ' + new Date().toLocaleTimeString())
                return 'Se eliminó un producto.'
            }
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        } finally {
            mongoose.disconnect()
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    //Eliminar todos los productos
    static async deleteAll() {
        try {
            mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
            Logger.Logger.LoggerWarn.warn('WARN: Connected to mongoose. ' + new Date().toLocaleTimeString())
            const productList = getAll()
            if (productList === null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el producto. ' + new Date().toLocaleTimeString())
                return 'No se encontró el producto.'
            } else {
                await productsRaw.remove({})
                Logger.Logger.LoggerInfo.info('INFO: Se eliminó el listado de productos. ' + new Date().toLocaleTimeString())
                return 'Se eliminó el listado de productos.'
            }
        } catch (error) {
            Logger.Logger.LoggerError.error('ERROR: ' + error + ' ' + new Date().toLocaleTimeString())
        } finally {
            mongoose.disconnect()
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    //Crear nuevo carrito
    static async createCart() {
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
    static async addToCart(cartId, productId) {
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
    static async getCart(cartId) {
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
    static async deleteFromCart(cartId, productId) {
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
                Logger.Logger.LoggerInfo.info('INFO: Se eliminó un producto de tu carrito. ' + new Date().toLocaleTimeString())
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
    static async emptyCart(cartId) {
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
    static async deleteCart(cartId) {
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
}

export default MongoDBContainer
