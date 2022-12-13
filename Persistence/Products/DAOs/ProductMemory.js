import ProductDAOFactory from "../ProductFactory";
import { ProductDB } from "../../../DB/Memory/memoryDB";

let MemoryProductDAO = null

class MemoryProductDAOFactory extends ProductDAOFactory {
    constructor() {
        super()
    }

    modifyDB(typeOfRequest, isMultiple, productId, productData) {
        try {
            if (typeOfRequest == 'POST') {
                ProductDB.push(productData)
            } else if (typeOfRequest == 'PUT') {
                const requestedProduct = this.geById(productId)
                ProductDB.splice(requestedProduct, 1)
                ProductDB.push(productData)
            } else {
                if (isMultiple == 'YES') {
                    const requestedProduct = this.geById(productId)
                    ProductDB.splice(requestedProduct, 1)
                } else {
                    ProductDB = []
                }
            }    
            Logger.Logger.LoggerInfo.info(`INFO: Base de datos de productos modificada correctamente. ` + new Date().toLocaleTimeString())
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    geById(productId) {
        try {
            const requestedProduct = ProductDB.forEach(product => {
                if (product.idNumber == productId) {
                    return product
                }
            })
            return requestedProduct
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    getAll() {
        try {
            return ProductDB
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    static getInstance() {
        if(!MemoryProductDAO) {
            MemoryProductDAO = new MemoryProductDAOFactory()
        }

        return MemoryProductDAO
    }
}

export default MemoryProductDAO = new MemoryProductDAOFactory()