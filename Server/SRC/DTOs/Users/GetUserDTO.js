const {DTOFactory} = require('../DTOFactory')

class GetUserDTOFactory extends DTOFactory {
    constructor() {
        super()
    }

    DTO(data, idNumber, productQuantity) {
        const user = {
            username: data.username,
            name: data.name,
            email: data.email,
            isAdmin: data.isAdmin
        }
        return user
    }

    static getInstance() {
        if(!GetUserDTO) {
            GetUserDTO = new GetUserDTOFactory()
        }

        return GetUserDTO
    }
}

const GetUserDTO = new GetUserDTOFactory()

module.exports = {GetUserDTO}