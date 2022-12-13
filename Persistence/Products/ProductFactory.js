let ProductDAO = null

export default class ProductDAOFactory {
    constructor() {

    }

    async modifyDB(updatedData) {

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