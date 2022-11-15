const Logger = require('../../../utils/logger')

let productList = []
let cartList = []

class MemoriaContainer {
    //Get
    fetchProductDatabase() {
        return productList
    }
    fetchCartDatabase() {
        return cartList
    }
    //Save
    updateProductDatabase() {
        return productList = updatedProductList
    }
    updateCartDatabase() {
        return cartList = updatedCartData
    }
}

export default MemoriaContainer