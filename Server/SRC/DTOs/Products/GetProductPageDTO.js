const {DTOFactory} = require('../DTOFactory')

class GetProductPageDTOFactory extends DTOFactory {
    constructor() {
        super()
    }

    DTO(data, idNumber, productQuantity) {
        const product = {
            idNumber: data.idNumber,
            stock: data.stock,
            name: data.name,
            productType: data.productType,
            skinType: data.skinType,
            hairType: data.hairType,
            function: data.function,
            zeroWaste: data.zeroWaste,
            price: data.price,
            presentation: data.presentation,
            detailThumbnail: data.detailThumbnail,
            description: data.description,
            instructions: data.instructions,
            inci: data.inci
        }
        return product
    }

    static getInstance() {
        if(!GetProductPageDTO) {
            GetProductPageDTO = new GetProductPageDTOFactory()
        }

        return GetProductPageDTO
    }
}

const GetProductPageDTO = new GetProductPageDTOFactory()

module.exports = {GetProductPageDTO}