const {readFileSync, writeFileSync} = require('fs')
const {Logger} = require('../../../Utils/Logger')
const {UsersDAOFactory} = require('../UserFactory')

class FileUsersDAOFactory extends UsersDAOFactory {
    constructor() {
        super()
    }

    async modifyDB(typeOfRequest, isMultiple, userId, userData, isProduct) {
        try {
            const UserDB = JSON.parse(readFileSync('../../../DB/File/userFileDB.json', 'utf-8'))
            if (typeOfRequest == 'POST') {
                UserDB.push(userData)
            } else if (typeOfRequest == 'PUT') {
                if (!isProduct) {
                    const requestedUser = this.geById(userId)
                    if (userData.isAdmin == null) {
                        requestedUser.username = userData.username
                        requestedUser.name = userData.name
                        requestedUser.password = userData.password
                        requestedUser.email = userData.email
                    } else {
                        requestedUser.isAdmin = userData.isAdmin
                    }
                    /*
                    Alternativa:
                    if (userData.isAdmin == null) {
                        const updatedUser = {
                            idNumber: requestedUser.idNumber,
                            username: userData.username,
                            name: userData.name,
                            password: userData.password,
                            email: userData.email,
                            isAdmin: requestedUser.isAdmin,
                            cart: requestedUser.cart
                        }
                    } else {
                        const updatedUser = {
                            idNumber: requestedUser.idNumber,
                            username: requestedUser.username,
                            name: requestedUser.name,
                            password: requestedUser.password,
                            email: requestedUser.email,
                            isAdmin: userData.isAdmin,
                            cart: requestedUser.cart
                        }
                    }
                    UserDB.splice(requestedUser, 1)
                    UserDB.push(updatedUser)
                    */
                } else {
                    const requestedUser = this.geById(userId)
                    requestedUser.cart = userData.cart
                    /*
                    Alternativa:
                    const updatedUser = {
                        idNumber: requestedUser.idNumber,
                        username: requestedUser.username,
                        name: requestedUser.name,
                        password: requestedUser.password,
                        email: requestedUser.email,
                        isAdmin: requestedUser.isAdmin,
                        cart: userData.cart
                    }
                    UserDB.splice(requestedUser, 1)
                    UserDB.push(updatedUser)
                    */
                }
            } else {
                if (!isMultiple) {
                    const requestedUser = this.geById(userId)
                    UserDB.splice(requestedUser, 1)
                } else {
                    UserDB = []
                }
            }
            writeFileSync('../../../DB/File/userFileDB.json', JSON.stringify(UserDB, null, 2), 'utf-8')
            Logger.LoggerInfo.info(`INFO: Base de datos de usuarios modificada correctamente. ` + new Date().toLocaleTimeString())
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async geById(userId) {
        try {
            const UserDB = JSON.parse(readFileSync('../../../DB/File/userFileDB.json', 'utf-8'))    
            const requestedUser = UserDB.forEach(user => {
                if (user.idNumber == userId) {
                    return user
                }
            })
            return requestedUser
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async getAll() {
        try {
            const UserDB = JSON.parse(readFileSync('../../../DB/File/userFileDB.json', 'utf-8'))    
            return UserDB
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    static getInstance() {
        if(!FileUsersDAO) {
            FileUsersDAO = new FileUsersDAOFactory()
        }

        return FileUsersDAO
    }
}

const FileUsersDAO = new FileUsersDAOFactory()

module.exports = {FileUsersDAO}