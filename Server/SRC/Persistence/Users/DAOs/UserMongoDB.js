const {Logger} = require('../../../Utils/Logger')
const {MongooseConnect, MongooseDisconnect} = require('../../../Config/MongoDB/MongoConfig')
const  {mongooseSchemas} = require('../../../Config/MongoDB/Models/mongooseSchemas')
const {UsersDAOFactory} = require('../UserFactory')

class MongoDBUsersDAOFactory extends UsersDAOFactory {
    constructor() {
        super()
    }

    async modifyDB(typeOfRequest, multiple, userId, userData, isProduct) {
        try {
            MongooseConnect
            Logger.LoggerWarn.warn('WARN: Mongoose connected. ' + new Date().toLocaleTimeString())
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
            Logger.LoggerInfo.info(`INFO: Base de datos de usuarios modificada correctamente. ` + new Date().toLocaleTimeString())
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        } finally {
            MongooseDisconnect
            Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    async geById(userId) {
        try {
            MongooseConnect
            Logger.LoggerWarn.warn('WARN: Mongoose connected. ' + new Date().toLocaleTimeString())
            const requestedUser = JSON.parse(await users.findOne({idNumber: userId}).pretty)
            return requestedUser
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
            const allUsers = await users.find().sort({idNumber: 1}).pretty
            return allUsers
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        } finally {
            MongooseDisconnect
            Logger.LoggerWarn.warn('WARN: Mongoose disconnected. ' + new Date().toLocaleTimeString())
        }
    }

    static getInstance() {
        if(!MongoDBUsersDAO) {
            MongoDBUsersDAO = new MongoDBUsersDAOFactory()
        }

        return MongoDBUsersDAO
    }
}

const MongoDBUsersDAO = new MongoDBUsersDAOFactory()

module.exports = {MongoDBUsersDAO}