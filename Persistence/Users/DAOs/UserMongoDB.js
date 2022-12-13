import mongoose from "mongoose"
import { mongooseSchemas } from "../../../SRC/Config/MongoDB/Models/mongooseSchemas";
import UsersDAOFactory from "../UserFactory"

let MongoDBUsersDAO = null

class MongoDBUsersDAOFactory extends UsersDAOFactory {
    constructor() {
        super()
    }

    async modifyDB(typeOfRequest, multiple, userId, userData, isProduct) {
        try {
            /*
            Conectamos a base datos con mongoose.connect
            Si la req es de tipo post, creo un nuevo usuario con los datos
            recibidos en userData utilizando el mongooseSchema.User

            Si la req es de tipo put, defino si existe un valor para productId
            o si es nulo, si es nulo quiere decir que la modificación corresponde
            a los datos de cuenta del usuario, si no lo es, lo que se está modificando
            es el carrito de compras, las transformaciones dentro del carrito se relizan
            en la capa services
            Llamo al usuario por su numberId (no el id que asigna mongoDB al documento)
            con updateOne
            uso el modificador $set para sobreescribir únicamente los campos del documento
            correspondientes, con los valores recibidos en userData
            multiple no se utiliza

            Si la req es de tipo delete, defino si el valor de multiple es igual a YES,
            en ese caso se borrarán todos los usuarios registrados en la base, uso deleteMany
            y le pasó como valor un objeto vacío para borrar todos los documentos de la colección
            Caso contrario estamos borrando un usuario que buscamos por su numberId con findOneAndDelete
            Desconectamos de mongoose
            */
            mongoose.connect('mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority')
            Logger.Logger.LoggerWarn.warn('WARN: Mongoose connected. ' + new Date().toLocaleTimeString())
            if (typeOfRequest == 'POST') {
                new mongooseSchemas.User(userData)
            } else if (typeOfRequest == 'PUT') {
                if (!isProduct) {
                    if (userData.isAdmin == null) {
                        await users.updateOne({numberId: userId}, {$set: {
                            username: userData.username,
                            name: userData.name,
                            password: userData.password,
                            email: userData.email
                        }})
                    } else {
                        await users.updateOne({numberId: userId}, {$set: {
                            isAdmin: userData.isAdmin
                        }})
                    }
                } else {
                    await users.updateOne({numberId: userId}, {$set: {cart: userData.cart}})
                }
            } else {
                if (multiple == 'YES') {
                    await users.deleteMany({})
                } else {
                    await users.findOneAndDelete({idNumber: userId})
                }
            }            
            Logger.Logger.LoggerInfo.info(`INFO: Base de datos de usuarios modificada correctamente. ` + new Date().toLocaleTimeString())
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
            const requestedUser = JSON.parse(await users.findOne({idNumber: userId}).pretty)
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