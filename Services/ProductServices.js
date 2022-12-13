import Env from '../SRC/Config/config'
import IdCompare from '../SRC/Utils/IdCompare'
import Logger from '../SRC/Utils/Logger'
import ProductFile from '../Persistence/Products/DAOs/ProductFile'
import ProductFirebase from '../Persistence/Products/DAOs/ProductFirebase'
import ProductMemory from '../Persistence/Products/DAOs/ProductMemory'
import ProductMongoDB from '../Persistence/Products/DAOs/ProductMongoDB'

//Establezco 'MEMORY' como default setting en la variable PERS. Ver dotenv, .env y por qué no toma los valores de DAO
let DAO = ProductMemory
if(Env.PERS === 'FILE') {
    DAO = ProductFile
}
if(Env.PERS === 'FIREBASE') {
    DAO = ProductFirebase
}
if(Env.PERS === 'MONGODB') {
    DAO = ProductMongoDB
}

let ProductServicesInstance = null

class ProductServices {

    constructor() {

    }

    async addNewProductService(productData) {
        try {
            const productList = await DAO.getAll()
            //Mudar a ProductDTO
            const newProduct = {
                idNumber: IdCompare(productList) + 1,
                productCode: productData.productCode,
                stock: productData.productStock,
                name: productData.productName,
                productType: productData.productType,
                skinType: productData.productSkinType,
                hairType: productData.productHairType,
                function: productData.productFunction,
                zeroWaste: productData.ProductZeroWaste,
                price: productData.productPrice,
                presentation: productData.productPresentation,
                thumbnail: productData.productThumbnail,
                detailThumbnail: productData.productThumbnailBig,
                description: productData.productDescription,
                instructions: productData.productInstructions,
                inci: productData.productInci
            }
            await DAO.modifyDB('POST', null, null, newProduct )
            Logger.Logger.LoggerInfo.info(`INFO: Se agregó ${newProduct.name} al listado de productos. ` + new Date().toLocaleTimeString())
            return `Se agregó ${newProduct.name} al listado de productos.`
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async getProductByIdService(productId) {
        try {
            const requestedProduct = await DAO.geById(productId)
            if (requestedProduct == null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el producto solicitado. ' + new Date().toLocaleTimeString())
                return 'No se encontró el producto solicitado.'
            } else {
                //Crear ProductDTO que devuelva sólo los datos a mostrar en la página de productos 
                return requestedProduct
            }
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async getAllProductsService() {
        try {
            const productList = await DAO.getAll()
            if (productList.length == 0) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
                return 'No se encontraron productos.'
            } else {
                return productList
                //Crear un ProductDTO que devuelva sólo la información contenida en las cards de productos en galería
            }
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async updateProductInfoService(productId, updatedProductData) {
        try {
            const productToUpdate = await DAO.geById(productId)
            if (productToUpdate == null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el producto solicitado. ' + new Date().toLocaleTimeString())
                return 'No se encontró el producto solicitado.'
            } else {
                //Mudar a ProductDTO
                const updatedProduct = {
                    idNumber: productId,
                    productCode: updatedProductData.productCode,
                    stock: updatedProductData.productStock,
                    name: updatedProductData.productName,
                    productType: updatedProductData.productType,
                    skinType: updatedProductData.productSkinType,
                    hairType: updatedProductData.productHairType,
                    function: updatedProductData.productFunction,
                    zeroWaste: updatedProductData.ProductZeroWaste,
                    price: updatedProductData.productPrice,
                    presentation: updatedProductData.productPresentation,
                    thumbnail: updatedProductData.productThumbnail,
                    detailThumbnail: updatedProductData.productThumbnailBig,
                    description: updatedProductData.productDescription,
                    instructions: updatedProductData.productInstructions,
                    inci: updatedProductData.productInci
                }
                await DAO.modifyDB('PUT', null, productId, updatedProduct)
                Logger.Logger.LoggerInfo.info(`INFO: Se modificó la información de ${updatedProduct.name}. ` + new Date().toLocaleTimeString())
                return `Se modificó la información de ${updatedProduct.name}.`
            }
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async deleteProductByIdService(productId) {
        try {
            const productToDelete = await DAO.geById(productId)
            if (productToDelete == null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el producto solicitado. ' + new Date().toLocaleTimeString())
                return 'No se encontró el producto solicitado.'
            } else {
                await DAO.modifyDB('DELETE', null, productId, null)
                Logger.Logger.LoggerInfo.info(`INFO: Se eliminó la información de ${requestedProduct.name} del listado de productos. ` + new Date().toLocaleTimeString())
                return `Se eliminó la información de ${requestedProduct.name} del listado de productos.`
            }
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async deleteAllProductsService() {
        try {
            const productList = await DAO.getAll()
            if (productList.length == 0) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
                return 'No se encontraron productos.'
            } else {
                await DAO.modifyDB('DELETE', 'YES', null, null)
                Logger.Logger.LoggerInfo.info('INFO: Se eliminó el listado de productos. ' + new Date().toLocaleTimeString())
                return 'Se eliminó el listado de productos.'
            }
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    static getInstance() {
        if(!ProductServicesInstance) {
            ProductServicesInstance = new ProductServices()
        }

        return ProductServicesInstance
    }
}

export default ProductServicesInstance = new ProductServices()