const {DTOFactory} = require('../DTOFactory')

class PutUserPermitsDTOFactory extends DTOFactory {
    constructor() {
        super()
    }

    DTO(data, idNumber, productQuantity) {
        const userPermits = {
            isAdmin: data.isAdmin
        }
        return userPermits
    }

    static getInstance() {
        if(!PutUserPermitsDTO) {
            PutUserPermitsDTO = new PutUserPermitsDTO()
        }

        return PutUserPermitsDTO
    }
}

const PutUserPermitsDTO = new PutUserPermitsDTOFactory()

module.exports = {PutUserPermitsDTO}