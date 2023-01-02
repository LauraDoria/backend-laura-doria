class UsersDAOFactory {
    constructor() {

    }

    async modifyDB(typeOfRequest, multiple, userId, userData, isProduct) {

    }

    async geById(userId) {

    }

    async getAll() {

    }

    static getInstance() {
        if(!UsersDAO) {
            UsersDAO = new UsersDAOFactory()
        }

        return UsersDAO
    }
}

const UsersDAO = new UsersDAOFactory()

module.exports = {UsersDAOFactory}