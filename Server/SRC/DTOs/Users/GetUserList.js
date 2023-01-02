const {DTOFactory} = require('../DTOFactory')

class GetUserListDTOFactory extends DTOFactory {
    constructor() {
        super()
    }

    DTO(data, idNumber, productQuantity) {
        const users = []
        const userList = data.forEach(user => {
            const userItem = {
                username: user.username,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
            users.push(userItem)
            return users
        });
        return userList
    }

    static getInstance() {
        if(!GetUserListDTO) {
            GetUserListDTO = new GetUserListDTOFactory()
        }

        return GetUserListDTO
    }
}

const GetUserListDTO = new GetUserListDTOFactory()

module.exports = {GetUserListDTO}