import UsersDAOFactory from "../UserFactory"
import * as fs from 'fs'

let FileUsersDAO = null

class FileUsersDAOFactory extends UsersDAOFactory {
    constructor() {
        super()
    }

    async modifyDB(updatedData) {
        try {
            fs.writeFileSync('../../../DB/File/userFileDB.json', JSON.stringify(updatedData, null, 2), 'utf-8')
            Logger.Logger.LoggerInfo.info(`INFO: Base de datos de usuarios modificada correctamente. ` + new Date().toLocaleTimeString())
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async geById(userId) {
        try {
            const UserDB = JSON.parse(fs.readFileSync('../../../DB/File/userFileDB.json', 'utf-8'))    
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

    async getAll() {
        try {
            const UserDB = JSON.parse(fs.readFileSync('../../../DB/File/userFileDB.json', 'utf-8'))    
            return UserDB
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    static getInstance() {
        if(!FileUsersDAO) {
            FileUsersDAO = new FileUsersDAOFactory()
        }

        return FileUsersDAO
    }
}

export default FileUsersDAO = new FileUsersDAOFactory()
