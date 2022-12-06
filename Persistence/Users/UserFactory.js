let UsersDAO = null

export default class UsersDAOFactory {
    constructor() {

    }

    async modifyDB(updatedData) {

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