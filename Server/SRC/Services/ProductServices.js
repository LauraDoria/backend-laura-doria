const {Env} = require('../Config/config')
const {GetProductGalleryDTO} = require('../DTOs/Products/GetProductGalleryDTO')
const {Logger} = require('../Utils/Logger')
const {MaxIdCalculator} = require('../Utils/Calculator')
const {PostProductDTO} = require('../DTOs/Products/PostProductDTO')
const {FileProductDAO} = require('../Persistence/Products/DAOs/ProductFile')
const {FirebaseProductDAO} = require('../Persistence/Products/DAOs/ProductFirebase')
const {MemoryProductDAO} = require('../Persistence/Products/DAOs/ProductMemory')
const {MongoDBProductDAO} = require('../Persistence/Products/DAOs/ProductMongoDB')
const {PutProductDTO} = require('../DTOs/Products/PutProductDTO')

//Establezco 'MEMORY' como default setting en entorno DEV para la variable PERS.
let DAO = MemoryProductDAO
if(Env.PERS === 'FILE') {
    DAO = FileProductDAO
}
if(Env.PERS === 'FIREBASE') {
    DAO = FirebaseProductDAO
}
if(Env.PERS === 'MONGODB') {
    DAO = MongoDBProductDAO
}

class ProductServicesContainer {

    constructor() {

    }

    //Agregar nuevo producto al listado.
    async addNewProductService(productData) {
        try {
            const idNumber = MaxIdCalculator(await DAO.getAll()) + 1
            const newProduct = PostProductDTO.DTO(productData, idNumber, null)
            await DAO.modifyDB('POST', null, null, newProduct )
            Logger.LoggerInfo.info(`INFO: Se agregó ${newProduct.name} al listado de productos. ` + new Date().toLocaleTimeString())
            return `Se agregó ${newProduct.name} al listado de productos.`
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    //Obtener producto por su id.
    async getProductByIdService(productId) {
        try {
            const requestedProduct = await DAO.geById(productId)
            if (requestedProduct == null) {
                Logger.LoggerInfo.info('INFO: No se encontró el producto solicitado. ' + new Date().toLocaleTimeString())
                return 'No se encontró el producto solicitado.'
            } else {
                const productPageData = GetProductPageDTO.DTO(requestedProduct, null, null)
                return productPageData
            }
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    //Obtener todos los productos.
    async getAllProductsService() {
        try {
            const productList = await DAO.getAll()
            if (productList.length == 0) {
                Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
                return 'No se encontraron productos.'
            } else {
                const galleryData = GetProductGalleryDTO.DTO(productList, null, null)
                return galleryData
            }
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    //Actualizar información de un producto ya registrado.
    async updateProductInfoService(productId, productData) {
        try {
            const productToUpdate = await DAO.geById(productId)
            if (productToUpdate == null) {
                Logger.LoggerInfo.info('INFO: No se encontró el producto solicitado. ' + new Date().toLocaleTimeString())
                return 'No se encontró el producto solicitado.'
            } else {
                const updatedProduct = PutProductDTO.DTO(productData, null, null)
                await DAO.modifyDB('PUT', null, productId, updatedProduct)
                Logger.LoggerInfo.info(`INFO: Se modificó la información de ${updatedProduct.name}. ` + new Date().toLocaleTimeString())
                return `Se modificó la información de ${updatedProduct.name}.`
            }
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    //Eliminar producto del listado.
    async deleteProductByIdService(productId) {
        try {
            const productToDelete = await DAO.geById(productId)
            if (productToDelete == null) {
                Logger.LoggerInfo.info('INFO: No se encontró el producto solicitado. ' + new Date().toLocaleTimeString())
                return 'No se encontró el producto solicitado.'
            } else {
                await DAO.modifyDB('DELETE', null, productId, null)
                Logger.LoggerInfo.info(`INFO: Se eliminó la información de ${requestedProduct.name} del listado de productos. ` + new Date().toLocaleTimeString())
                return `Se eliminó la información de ${requestedProduct.name} del listado de productos.`
            }
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    //Eliminar todos los productos del listado.
    async deleteAllProductsService() {
        try {
            const productList = await DAO.getAll()
            if (productList.length == 0) {
                Logger.LoggerInfo.info('INFO: No se encontraron productos. ' + new Date().toLocaleTimeString())
                return 'No se encontraron productos.'
            } else {
                await DAO.modifyDB('DELETE', 'YES', null, null)
                Logger.LoggerInfo.info('INFO: Se eliminó el listado de productos. ' + new Date().toLocaleTimeString())
                return 'Se eliminó el listado de productos.'
            }
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    static getInstance() {
        if(!ProductServices) {
            ProductServices = new ProductServicesContainer()
        }

        return ProductServices
    }
}

const ProductServices = new ProductServicesContainer()

module.exports = {ProductServices}