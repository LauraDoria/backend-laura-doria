import * as fs from 'fs'
import ProductDAOFactory from "../ProductFactory";

let FileProductDAO = null

class FileProductDAOFactory extends ProductDAOFactory {
    constructor() {
        super()
    }

    async modifyDB(typeOfRequest, isMultiple, productId, productData) {
        try {
            const ProductDB = JSON.parse(fs.readFileSync('../../../DB/File/productFileDB.json', 'utf-8'))
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
            fs.writeFileSync('../../../DB/File/productFileDB.json', JSON.stringify(ProductDB, null, 2), 'utf-8')
            Logger.Logger.LoggerInfo.info(`INFO: Base de datos de productos modificada correctamente. ` + new Date().toLocaleTimeString())
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async geById(productId) {
        try {
            const ProductDB = JSON.parse(fs.readFileSync('../../../DB/File/productFileDB.json', 'utf-8'))    
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

    async getAll() {
        try {
            const ProductDB = JSON.parse(fs.readFileSync('../../../DB/File/productFileDB.json', 'utf-8'))
            return ProductDB    
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    static getInstance() {
        if(!FileProductDAO) {
            FileProductDAO = new FileProductDAOFactory()
        }

        return FileProductDAO
    }
}

export default FileProductDAO = new FileProductDAOFactory()