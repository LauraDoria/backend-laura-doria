const {DTOFactory} = require('../DTOFactory')

class GetProductGalleryDTOFactory extends DTOFactory {
    constructor() {
        super()
    }

    DTO(data, idNumber, productQuantity) {
        const displayedItems = []
        const gallery = data.forEach(product => {
            displayedItems.push({
                idNumber: product.idNumber,
                name: product.name,
                price: product.price,
                presentation: product.presentation,
                thumbnail: product.thumbnail
            })
            return displayedItems
        });
        return gallery
    }

    static getInstance() {
        if(!GetProductGalleryDTO) {
            GetProductGalleryDTO = new GetProductGalleryDTOFactory()
        }

        return GetProductGalleryDTO
    }
}

const GetProductGalleryDTO = new GetProductGalleryDTOFactory()

module.exports = {GetProductGalleryDTO}