import UsersDAOFactory from "../UserFactory"
import { UserDB } from "../../../DB/Memory/memoryDB"


let MemoryUsersDAO = null

class MemoryUsersDAOFactory extends UsersDAOFactory {
    constructor() {
        super()
    }

    modifyDB(updatedData) {
        try {
            UserDB.length = 0
            UserDB.push(updatedData)
            Logger.Logger.LoggerInfo.info(`INFO: Base de datos de usuarios modificada correctamente. ` + new Date().toLocaleTimeString())
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    geById(userId) {
        try {
            const requestedUser = UserDB.forEach(user => {
                if (user.idNumber == userId) {
                    return user
                }
            })
            return requestedUser
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    getAll() {
        try {
            return UserDB
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    static getInstance() {
        if(!MemoryUsersDAO) {
            MemoryUsersDAO = new MemoryUsersDAOFactory()
        }

        return MemoryUsersDAO
    }
}

export default MemoryUsersDAO = new MemoryUsersDAOFactory()