class DTOFactory {
    constructor() {
        this.DTO = {}
    }

    DTO(data, idNumber, productQuantity) {

    }

    static getInstance() {
        if(!DTOFactoryInstance) {
            DTOFactoryInstance = new DTOFactory()
        }

        return DTOFactoryInstance
    }
}

const DTOFactoryInstance = new DTOFactory()

module.exports = {DTOFactory}