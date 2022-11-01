import mongoose from 'mongoose'
import {mongooseSchemas} from './mongooseSchemas'

//Guardar nuevo producto
const save = (newData) => {
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
const getById = async (productId) => {
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
const getAll = async () => {
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
const update = async (productId, updatedData) => {
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
const deleteById = async (productId) => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        Logger.Logger.LoggerWarn.warn('WARN: Connected to mongoose. ' + new Date().toLocaleTimeString())
        const productToDelete = getById(productId)
        if (productToDelete === null) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontró el producto. ' + new Date().toLocaleTimeString())
            return 'No se encontró el producto.'
        } else {
            await productsRaw.findOneAndDelete({_id: productId})
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

//Eliminar todos los productos
const deleteAll = async () => {
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

export const ProductsMongoose = { save, getById, getAll, update, deleteById, deleteAll }

