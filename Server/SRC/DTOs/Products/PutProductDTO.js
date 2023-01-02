const {DTOFactory} = require('../DTOFactory')

class PutProductDTOFactory extends DTOFactory {
    constructor() {
        super()
    }

    DTO(data, idNumber, productQuantity) {
        const product = ''
        if (!data.productName) {
            if (!data.productStock) {
                product = {
                    price: data.productPrice
                }
            } else {
                product = {
                    stock: data.productStock
                }
            }
        } else {
            product = {
                idNumber: data.idNumber,
                productCode: data.productCode,
                stock: data.productStock,
                name: data.productName,
                productType: data.productType,
                skinType: data.productSkinType,
                hairType: data.productHairType,
                function: data.productFunction,
                zeroWaste: data.ProductZeroWaste,
                price: data.productPrice,
                presentation: data.productPresentation,
                thumbnail: data.productThumbnail,
                detailThumbnail: data.productThumbnailBig,
                description: data.productDescription,
                instructions: data.productInstructions,
                inci: data.productInci
            }
        }
        return product
    }

    static getInstance() {
        if(!PutProductDTO) {
            PutProductDTO = new PutProductDTOFactory()
        }

        return PutProductDTO
    }
}

const PutProductDTO = new PutProductDTOFactory()

module.exports = {PutProductDTO}