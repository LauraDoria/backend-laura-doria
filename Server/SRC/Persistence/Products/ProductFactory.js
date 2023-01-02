class ProductDAOFactory {
    constructor() {

    }

    async modifyDB(typeOfRequest, isMultiple, productId, productData) {

    }

    async geById(productId) {

    }

    async getAll() {

    }

    static getInstance() {
        if(!ProductDAO) {
            ProductDAO = new ProductDAOFactory()
        }

        return ProductDAO
    }
}

const ProductDAO = new ProductDAOFactory()

module.exports = {ProductDAOFactory}