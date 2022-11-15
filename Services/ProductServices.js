import { P } from 'pino'

const Logger = require('../SRC/Utils/Logger')
const DBConnect = require('../SRC/Config/config')
const IdCompare = require('../SRC/Utils/IdCompare')
let ProductDAO = ''
if(DBConnect.Env.PERS == 'ARCHIVO') {
    ProductDAO = require('../Persistence/Archivo/DAO/Product/archivoProductDAO')
} else if(DBConnect.Env.PERS == 'FIREBASE') {
    ProductDAO = require('../Persistence/Firebase/DAO/Product/firebaseProductDAO')
} else if(DBConnect.Env.PERS == 'MEMORIA') {
    ProductDAO = require('../Persistence/Memoria/DAO/Product/memoriaProductDAO')
} else {
    ProductDAO = require('../Persistence/MongoDB/DAO/Product/mongoDBProductDAO')
}


class ProductServices {
    //Guardar nuevo producto
    save(newData) {
        const productData = ''//Función fetchProductDatabase() desde ProductDAO (en Mongo varía)
        const newProductId = IdCompare(cartData) + 1
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
        const updatedProductList = [...productData, newProduct]
        //Función updateProductDatabase() desde ProductDAO (en Mongo varía)
        Logger.Logger.LoggerInfo.info('INFO: Se agregó un producto al listado. ' + new Date().toLocaleTimeString())
        return newProduct
    }

    //Obtener producto
    getById(id) {
        const productData = ''//Función fetchProductDatabase() desde ProductDAO (en Mongo varía)
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
        const productData = ''//Función fetchProductDatabase() desde ProductDAO (en Mongo varía)
        if (productData.length == 0){
            Logger.Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
            return 'No se encontraron productos.'
        } else {
            return productData
        }
    }

    //Actualizar producto
    update(id, updatedData) {
        const productData = ''//Función fetchProductDatabase() desde ProductDAO (en Mongo varía)
        if (productData.length === 0) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
            return 'No se encontraron productos.'
        } else {
            const product = getById(id)
            if (product.id == null) {
                const newProduct = save(updatedData)
                const updatedProductList = [...productData, newProduct]
                //
                Logger.Logger.LoggerInfo.info('INFO: Se agregó un producto al listado. ' + new Date().toLocaleTimeString())
                return newProduct
            } else {
                deleteById(id)
                const updatedProduct = save(updatedData)
                const updatedProductList = [...productData, updatedProduct]
                //Función updateProductDatabase() desde ProductDAO (en Mongo varía)
                Logger.Logger.LoggerInfo.info('INFO: Se actualizó la información de un producto. ' + new Date().toLocaleTimeString())
                return updatedProduct
            }
        }
    }

    //Eliminar producto
    deleteById(id) {
        const productData = ''//Función fetchProductDatabase() desde ProductDAO (en Mongo varía)
        if (productData.length === 0) {
            Logger.Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
            return 'No se encontraron productos.'
        } else {
            const product = getById(id)
            productData.splice(product, 1)
            const updatedProductList = [...productData]
            //Función updateProductDatabase() desde ProductDAO (en Mongo varía)
            Logger.Logger.LoggerInfo.info('INFO: Se eliminó un producto del listado. ' + new Date().toLocaleTimeString())
            return updatedProductList
        }
    }

    //Eliminar todos los productos
    deleteAll() {
        const updatedProductList = []
        //Función updateProductDatabase() desde ProductDAO (en Mongo varía)
        Logger.Logger.LoggerInfo.info('INFO: Se eliminó el listado de productos. ' + new Date().toLocaleTimeString())
        return 'No hay productos para mostrar.'
    }
}

export default ProductServices