const {DTOFactory} = require('../DTOFactory')

class PutCartDTOFactory extends DTOFactory {
    constructor() {
        super()
    }

    DTO(data, idNumber, productQuantity) {
        const newProduct = {
            timestamp: new Date().toLocaleTimeString(),
            productData: {
                idNumber: data.idNumber,
                name: data.name,
                price: data.price,
                presentation: data.presentation,
                thumbnail: data.thumbnail
            },
            productQuantity: productQuantity
        }
        /* Alternativa:
            const newProduct = {
                timestamp: new Date().toLocaleTimeString(),
                idNumber: data.idNumber,
                name: data.name,
                price: data.price,
                presentation: data.presentation,
                thumbnail: data.thumbnail
                productQuantity: productQuantity
            }
        */
        return newProduct
    }

    static getInstance() {
        if(!PuttCartDTO) {
            PutCartDTO = new PutCartDTOFactory()
        }

        return PutCartDTO
    }
}

const PutCartDTO = new PutCartDTOFactory()

module.exports = {PutCartDTO}