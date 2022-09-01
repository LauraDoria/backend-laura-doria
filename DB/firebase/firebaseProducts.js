const admin = require('firebase-admin')
const db = admin.firestore()
const query = db.collection('productsRaw')


//Guardar nuevo producto
const save = (newData) => {
    try {
        let doc = query.doc()
        const newProduct = await doc.create({
            displayOrder: newData.displayOrder,
            productCode: newData.productCode,
            stock: newData.productStock,
            name: newData.productName,
            productType: newData.productType,
            skinType: newData.productSkinType,
            hairType: newData.productHairType,
            use: newData.productFunction,
            zeroWaste: newData.ProductZeroWaste,
            price: newData.productPrice,
            presentation: newData.productPresentation,
            thumbnail: newData.productThumbnail,
            detailThumbnail: newData.productThumbnailBig,
            description: newData.productDescription,
            instructions: newData.productInstructions,
            inci: newData.productInci
        })
        return newProduct
    } catch (error) {
        console.error(error)
    }
}

//Obtener producto
const getById = async (productId) => {
    try {
        const doc = query.doc(`${productId}`)
        const item = await doc.get()
        const response = item.data()
        return response
    } catch (error) {
        console.error(error)
    }
}

//Obtener todos los productos
const getAll = async () => {
    try {
        const querySnapshot = await query.get()
        let docs = querySnapshot.docs
        const response = docs.map((doc) => {
            products.push(...products, doc.data())
            return products
        })
        return response
    } catch (error) {
        console.error(error)
    }
}



//Actualizar producto
const update = async (productId, updatedData) => {
    try {
        const doc = query.doc(`${productId}`)
        let item = await doc.update({
            productCode: updatedData.productCode,
            stock: updatedData.productStock,
            name: updatedData.productName,
            productType: updatedData.productType,
            skinType: updatedData.productSkinType,
            hairType: updatedData.productHairType,
            use: updatedData.productFunction,
            zeroWaste: updatedData.ProductZeroWaste,
            price: updatedData.productPrice,
            presentation: updatedData.productPresentation,
            thumbnail: updatedData.productThumbnail,
            detailThumbnail: updatedData.productThumbnailBig,
            description: updatedData.productDescription,
            instructions: updatedData.productInstructions,
            inci: updatedData.productInci
        })
        return 'Se actualizó la información de un producto.'
    } catch (error) {
        console.error(error)
    }
}

//Eliminar producto
const deleteById = async (productId) => {
    try {
        const doc = query.doc(`${productId}`)
        const item = await doc.delete()
        return 'Se eliminó un producto.'
    } catch (error) {
        console.error(error)
    }
}

//Eliminar todos los productos
const deleteAll = async () => {
    try {
        const querySnapshot = await query.get()
        let docs = querySnapshot.docs
        docs.map((doc) => {
            doc.delete()
        })
        return 'Se eliminó el listado de productos.'
    } catch (error) {
        console.error(error)
    }
}

//Permiso de administrador
let isAdmin = true

export const ProductsFirebase = { save, getById, getAll, update, deleteById, deleteAll, isAdmin}

