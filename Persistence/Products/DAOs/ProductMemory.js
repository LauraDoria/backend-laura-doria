import ProductDAOFactory from "../ProductFactory";
import { ProductDB } from "../../../DB/Memory/memoryDB";

let MemoryProductDAO = null

class MemoryProductDAOFactory extends ProductDAOFactory {
    constructor() {
        super()
    }

    modifyDB(updatedData) {
        try {
            ProductDB.length = 0
            ProductDB.push(updatedData)
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