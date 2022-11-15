const fs = require('fs')

class ArchivoContainer {
    //Get
    fetchProductDatabase() {
        return JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
    }
    fetchCartDatabase() {
        return JSON.parse(fs.readFileSync('./cart.json', 'utf-8'))
    }
    //Save
    updateProductDatabase() {
        fs.writeFileSync('./products.json', JSON.stringify(updatedProductList, null, 2), 'utf-8')
    }
    updateCartDatabase() {
        fs.writeFileSync('./cart.json', JSON.stringify(updatedCartData, null, 2), 'utf-8')
    }
}

export default ArchivoContainer