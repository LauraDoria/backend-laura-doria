const {Logger} = require('../../../Utils/Logger')
const {MongooseConnect, MongooseDisconnect} = require('../../../Config/MongoDB/MongoConfig')
const {mongooseSchemas} = require('../../../Config/MongoDB/Models/mongooseSchemas')
const {ProductDAOFactory} = require('../ProductFactory')

class MongoDBProductDAOFactory extends ProductDAOFactory {
    constructor() {
        super()
    }

    async modifyDB(typeOfRequest, isMultiple, productId, productData) {
        try {
            MongooseConnect
            Logger.LoggerWarn.warn('WARN: Mongoose connected. ' + new Date().toLocaleTimeString())
            if (typeOfRequest == 'POST') {
                new mongooseSchemas.User(productData)
            } else if (typeOfRequest == 'PUT') {
                if (!productData.idNumber) {
                    if (!productData.productStock) {
                        await productsRaw.updateOne({_id: productId}, {$set: {price: productData.productPrice}})
                    } else {
                        await productsRaw.updateOne({_id: productId}, {$set: {stock: productData.productStock}})
                    }
                } else {
                    await productsRaw.updateOne({_id: productId}, {productData})
                }
            } else {
                if (isMultiple == 'YES') {
                    await productsRaw.deleteMany({})
                } else {
                    await productsRaw.findOneAndDelete({idNumber: productId})
                }
            }                      
            Logger.LoggerInfo.info(`INFO: Base de datos de productos modificada correctamente. ` + new Date().toLocaleTimeString())
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        } finally {
            MongooseDisconnect
            Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    async geById(productId) {
        try {
            MongooseConnect
            Logger.LoggerWarn.warn('WARN: Mongoose connected. ' + new Date().toLocaleTimeString())
            const requestedProduct = JSON.parse(await productsRaw.findOne({idNumber: productId}).pretty)
            return requestedProduct
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        } finally {
            MongooseDisconnect
            Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    async getAll() {
        try {
            MongooseConnect
            Logger.LoggerWarn.warn('WARN: Mongoose connected. ' + new Date().toLocaleTimeString())
            const allProducts = await productsRaw.find().sort({idNumber: 1}).pretty
            return allProducts
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        } finally {
            MongooseDisconnect
            Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    static getInstance() {
        if(!MongoDBProductDAO) {
            MongoDBProductDAO = new MongoDBProductDAOFactory()
        }

        return MongoDBProductDAO
    }
}

const MongoDBProductDAO = new MongoDBProductDAOFactory()

module.exports = {MongoDBProductDAO}