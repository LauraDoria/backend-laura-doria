import ProductDAOFactory from "../ProductFactory";
import mongoose from "mongoose";
import { mongooseSchemas } from "../../../SRC/Config/MongoDB/Models/mongooseSchemas";

let MongoDBProductDAO = null

class MongoDBProductDAOFactory extends ProductDAOFactory {
    constructor() {
        super()
    }

    async modifyDB(updatedData) {
        try {
            mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose connected. ' + new Date().toLocaleTimeString())
            
            Logger.Logger.LoggerInfo.info(`INFO: Base de datos de productos modificada correctamente. ` + new Date().toLocaleTimeString())
            return 
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        } finally {
            mongoose.disconnect()
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    async geById(productId) {
        try {
            mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose connected. ' + new Date().toLocaleTimeString())
            const requestedProduct = JSON.parse(await productsRaw.findOne({idNumber: productId}).pretty)
            return requestedProduct
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        } finally {
            mongoose.disconnect()
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    async getAll() {
        try {
            mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose connected. ' + new Date().toLocaleTimeString())
            const allProducts = await productsRaw.find().sort({idNumber: 1}).pretty
            return allProducts
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        } finally {
            mongoose.disconnect()
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    static getInstance() {
        if(!MongoDBProductDAO) {
            MongoDBProductDAO = new MongoDBProductDAOFactory()
        }

        return MongoDBProductDAO
    }
}

export default MongoDBProductDAO = new MongoDBProductDAOFactory()