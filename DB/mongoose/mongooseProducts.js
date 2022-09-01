import mongoose from 'mongoose'
import {mongooseSchemas} from './mongooseSchemas'

//Guardar nuevo producto
const save = (newData) => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to mongoose.')
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
        console.log('Se agregó un producto al listado.');
        return newProduct
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
}

//Obtener producto
const getById = async (productId) => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to mongoose.')
        const requestedProduct = await productsRaw.findOne({_id: productId}).pretty
        if (requestedProduct === null) {
            console.log('No se encontró el producto.')
            return null
        } else {
            return JSON.parse(requestedProduct)
        }
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
}

//Obtener todos los productos
const getAll = async () => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to mongoose.')
        const allProducts = await productsRaw.find().sort({displayOrder: 1}).pretty
        if (allProducts === null) {
            console.log('No se encontraron productos.')
            return null
        } else {
            return JSON.parse(allProducts)
        }
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
}

//Actualizar producto
const update = async (productId, updatedData) => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to mongoose.')
        const productToUpdate = getById(productId)
        if (productToUpdate === null) {
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
            return 'Se actualizó la información de un producto.'
        }
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
}

//Eliminar producto
const deleteById = async (productId) => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to mongoose.')
        const productToDelete = getById(productId)
        if (productToDelete === null) {
            return 'No se encontró el producto.'
        } else {
            await productsRaw.findOneAndDelete({_id: productId})
            return 'Se eliminó un producto.'
        }
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
}

//Eliminar todos los productos
const deleteAll = async () => {
    try {
        mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to mongoDB.')
        const productList = getAll()
        if (productList === null) {
            return 'No se encontró el producto.'
        } else {
            await productsRaw.remove({})
            return 'Se eliminó el listado de productos.'
        }
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
}

//Permiso de administrador
let isAdmin = true

export const ProductsMongoose = { save, getById, getAll, update, deleteById, deleteAll, isAdmin }

