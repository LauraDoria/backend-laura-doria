const {Logger} = require('../../../Utils/Logger')
const {ProductDAOFactory} = require('../ProductFactory')
const {ProductDB} = require('../../../DB/Memory/memoryDB')

class MemoryProductDAOFactory extends ProductDAOFactory {
    constructor() {
        super()
    }

    modifyDB(typeOfRequest, isMultiple, productId, productData) {
        try {
            if (typeOfRequest == 'POST') {
                ProductDB.push(productData)
            } else if (typeOfRequest == 'PUT') {
                if (!productData.idNumber) {
                    const requestedProduct = this.geById(productId)
                    const updatedProduct = {...requestedProduct}
                    if (!productData.productStock) {
                        updatedProduct.price = productData.productPrice
                    } else {
                        updatedProduct.stock = productData.productStock
                    }
                    ProductDB.splice(requestedProduct, 1)
                    ProductDB.push(updatedProduct)
                } else {
                    const requestedProduct = this.geById(productId)
                    ProductDB.splice(requestedProduct, 1)
                    ProductDB.push(productData)
                }
            } else {
                if (isMultiple == 'YES') {
                    const requestedProduct = this.geById(productId)
                    ProductDB.splice(requestedProduct, 1)
                } else {
                    ProductDB = []
                }
            }    
            Logger.LoggerInfo.info(`INFO: Base de datos de productos modificada correctamente. ` + new Date().toLocaleTimeString())
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
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
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    getAll() {
        try {
            return ProductDB
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    static getInstance() {
        if(!MemoryProductDAO) {
            MemoryProductDAO = new MemoryProductDAOFactory()
        }

        return MemoryProductDAO
    }
}

const MemoryProductDAO = new MemoryProductDAOFactory()

module.exports = {MemoryProductDAO}