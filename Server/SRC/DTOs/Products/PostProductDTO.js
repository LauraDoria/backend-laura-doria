const {DTOFactory} = require('../DTOFactory')

class PostProductDTOFactory extends DTOFactory {
    constructor() {
        super()
    }

    DTO(data, idNumber, productQuantity) {
        const product = {
            idNumber: idNumber,
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
        return product
    }

    static getInstance() {
        if(!PostProductDTO) {
            PostProductDTO = new PostProductDTOFactory()
        }

        return PostProductDTO
    }
}

const PostProductDTO = new PostProductDTOFactory()

module.exports = {PostProductDTO}