const {DTOFactory} = require('../DTOFactory')

class PostUserDTOFactory extends DTOFactory {
    constructor() {
        super()
    }

    DTO(data, idNumber, productQuantity) {
        const newUser = {
            idNumber: idNumber,
            username: data.username,
            name: data.name,
            password: data.password,
            email: data.email,
            isAdmin: false,
            cart: []
        }
        return newUser
    }

    static getInstance() {
        if(!PostUserDTO) {
            PostUserDTO = new PostUserDTOFactory()
        }

        return PostUserDTO
    }
}

const PostUserDTO = new PostUserDTOFactory()

module.exports = {PostUserDTO}