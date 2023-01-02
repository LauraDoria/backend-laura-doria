const {firestoreDB} = require('../../../Config/Firebase/FirebaseConfig')
const {Logger} = require('../../../Utils/Logger')
const {ProductDAOFactory} = require('../ProductFactory')

//const queryProducts = db.collection('productsRaw')

class FirebaseProductDAOFactory extends ProductDAOFactory {
    constructor() {
        super()
    }

    async modifyDB(typeOfRequest, isMultiple, productId, productData) {
        try {
            if (typeOfRequest == 'POST') {
                const doc = queryProducts.doc(`${productData.idNumber}`)
                await doc.create({
                    productCode: productData.productCode,
                    stock: productData.productStock,
                    name: productData.productName,
                    productType: productData.productType,
                    skinType: productData.productSkinType,
                    hairType: productData.productHairType,
                    function: productData.productFunction,
                    zeroWaste: productData.ProductZeroWaste,
                    price: productData.productPrice,
                    presentation: productData.productPresentation,
                    thumbnail: productData.productThumbnail,
                    detailThumbnail: productData.productThumbnailBig,
                    description: productData.productDescription,
                    instructions: productData.productInstructions,
                    inci: productData.productInci
                })
            } else if (typeOfRequest == 'PUT') {
                if (!productData.idNumber) {
                    const doc = queryProducts.doc(`${productId}`)
                    if (!productData.productStock) {
                        await doc.update({
                            price: productData.productPrice
                        })
                    } else {
                        await doc.update({
                            stock: productData.productStock
                        })
                    }
                } else {
                    const doc = queryProducts.doc(`${productId}`)
                    await doc.update({
                        productCode: productData.productCode,
                        stock: productData.productStock,
                        name: productData.productName,
                        productType: productData.productType,
                        skinType: productData.productSkinType,
                        hairType: productData.productHairType,
                        function: productData.productFunction,
                        zeroWaste: productData.ProductZeroWaste,
                        price: productData.productPrice,
                        presentation: productData.productPresentation,
                        thumbnail: productData.productThumbnail,
                        detailThumbnail: productData.productThumbnailBig,
                        description: productData.productDescription,
                        instructions: productData.productInstructions,
                        inci: productData.productInci
                    })
                }
            } else {
                if (isMultiple == 'YES') {
                    const querySnapshot = await queryProducts.get()
                    let response = querySnapshot.docs
                    response.map((doc) => {
                        doc.delete()
                    })
                } else {
                    const doc = queryProducts.doc(`${productId}`)
                    doc.delete()
                }
            }    
            Logger.LoggerInfo.info(`INFO: Base de datos de productos modificada correctamente. ` + new Date().toLocaleTimeString())
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async geById(productId) {
        try {
            const doc = queryProducts.doc(`${productId}`)
            const response = await doc.get()
            const requiredProduct = response.data()
            return requiredProduct
        } catch (error) {
            Logger.LoggerError.info( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async getAll() {
        try {
            const querySnapshot = await queryProducts.get()
            const response = querySnapshot.docs
            const productList = response.map((doc) => {
                products.push(...products, doc.data())
                return products
            })
            return productList
        } catch (error) {
            Logger.LoggerError.info( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    static getInstance() {
        if(!FirebaseProductDAO) {
            FirebaseProductDAO = new FirebaseProductDAOFactory()
        }

        return FirebaseProductDAO
    }
}

const FirebaseProductDAO = new FirebaseProductDAOFactory()

module.exports = {FirebaseProductDAO}