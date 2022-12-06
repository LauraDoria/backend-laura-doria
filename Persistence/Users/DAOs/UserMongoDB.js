import UsersDAOFactory from "../UserFactory"
import mongoose from "mongoose"
import { mongooseSchemas } from "../../../SRC/Config/MongoDB/Models/mongooseSchemas";

let MongoDBUsersDAO = null

class MongoDBUsersDAOFactory extends UsersDAOFactory {
    constructor() {
        super()
    }

    async modifyDB(updatedData) {
        try {
            /*
            Todos los DAOs trabajan con 3 funciones:
                -Llamar todos los elementos de la BD
                -Llamar un único elemento de la BD por su id
                -Modificar la base de datos
            En los DAO de memoria y archivo se utiliza una única función
            para modificar la BD
            Firebase y Mongo utilizan métodos específicos para:
                -Crear nuevo elemento
                -Modificar un elemento
                -Eliminar un elemento
                -Eliminar todos los elementos
            Por lo que los DAOs de Firebase y Mongo, dentro del método modifyDB
            se debe considerar cada unos de esos casos
            -Mudar parte del código de la capa de servicios al DAO
            -Plantear diferentes casos dentro de modifyDB
            CREAR NUEVO ELEMENTO :const newProduct = new mongooseSchemas.User(updatedData)
            ACTUALIZAR ELEMENTO: await productsRaw.updateOne({_id: productId}, {updatedData})
            ELIMINAR UN ELEMENTO: await productsRaw.findOneAndDelete({_id: productId})
            ELIMINAR TODOS: await productsRaw.findOneAndDelete({_id: productId})
            ACTUALIZAR PROPIEDAD CART: await shoppingCarts.updateOne({_id: productId}, {$set: {products: updatedCart}})
            */
            mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose connected. ' + new Date().toLocaleTimeString())
            Logger.Logger.LoggerInfo.info(`INFO: Base de datos de usuarios modificada correctamente. ` + new Date().toLocaleTimeString())
            return 
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        } finally {
            mongoose.disconnect()
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    async geById(userId) {
        try {
            mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose connected. ' + new Date().toLocaleTimeString())
            const requestedUser = JSON.parse(await users.findOne({idNumber: productId}).pretty)
            return requestedUser
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
            const allUsers = await users.find().sort({idNumber: 1}).pretty
            return allUsers
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        } finally {
            mongoose.disconnect()
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    static getInstance() {
        if(!MongoDBUsersDAO) {
            MongoDBUsersDAO = new MongoDBUsersDAOFactory()
        }

        return MongoDBUsersDAO
    }
}

export default MongoDBUsersDAO = new MongoDBUsersDAOFactory()