const {DTOFactory} = require('../DTOFactory')

class GetCartDTOFactory extends DTOFactory {
    constructor() {
        super()
    }

    DTO(data, idNumber, productQuantity) {
        const cartItems = []
        const cart = data.forEach(product => {
            const productData = {
                idNumber: product.idNumber,
                name: product.name,
                price: product.price,
                presentation: product.presentation,
                thumbnail: product.thumbnail
            }
            const cartItem = {
                timestamp: new Date().toLocaleTimeString(),
                productData: productData,
                productQuantity: product.productQuantity
            }
            /* Alternativa:
                const cartItem = {
                    timestamp: new Date().toLocaleTimeString(),
                    idNumber: data.idNumber,
                    name: data.name,
                    price: data.price,
                    presentation: data.presentation,
                    thumbnail: data.thumbnail
                    productQuantity: data.productQuantity
                }
            */
            cartItems.push(cartItem)
            return cartItems
        })
        return cart
    }

    static getInstance() {
        if(!GetCartDTO) {
            GetCartDTO = new GetCartDTOFactory()
        }

        return GetCartDTO
    }
}

const GetCartDTO = new GetCartDTOFactory()

module.exports = {GetCartDTO}