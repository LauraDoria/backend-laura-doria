import Env from '../SRC/Config/config'
import IdCompare from '../SRC/Utils/IdCompare'
import Logger from '../SRC/Utils/Logger'
import UserFile from '../Persistence/Users/DAOs/UserFile'
import UserFirebase from '../Persistence/Users/DAOs/UserFirebase'
import UserMemory from '../Persistence/Users/DAOs/UserMemory'
import UserMongoDB from '../Persistence/Users/DAOs/UserMongoDB'
import ProductServices from './ProductServices'

//Establezco 'MEMORY' como default setting en la variable PERS. Ver dotenv, .env y por qué no toma los valores de DAO
let DAO = UserMemory
if(Env.PERS === 'FILE') {
    DAO = UserFile
}
if(Env.PERS === 'FIREBASE') {
    DAO = UserFirebase
}
if(Env.PERS === 'MONGODB') {
    DAO = UserMongoDB
}

let UserServicesInstance = null

class UserServices {

    constructor() {

    }

    async createUserService(newUserData) {
        try {
            const userDB = await DAO.getAll()
            const newUser = {
                idNumber: IdCompare(userDB) + 1,
                username: newUserData,
                password: newUserData,
                email: newUserData,
                cart: []
            }
            const updatedUserDB = [...userDB, newUser]
            await DAO.modifyDB(updatedUserDB)
            Logger.Logger.LoggerInfo.info(`INFO: Nuevo usuario ${newUser.email} registrado. ` + new Date().toLocaleTimeString())
            return `Usuario ${newUser.username} registrado correctamente.`
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async getUserByIdService(userId) {
        try {
            const requestedUser = await DAO.geById(userId)
            if (requestedUser == null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                const userData = {
                    idNumber: requestedUser.idNumber,
                    username: requestedUser.username,
                    email: requestedUser.email,
                    cart: requestedUser.cart
                }
                return userData
            }
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async getAllUsersService() {
        try {
            const userDB = await DAO.getAll()
            if (userDB.length == 0) {
                Logger.Logger.LoggerInfo.info('INFO: No hay usuarios registrados. ' + new Date().toLocaleTimeString())
                return 'No hay usuarios registrados.'
            } else {
                const userListData = []
                const userList = userDB.forEach(user => {
                    userListData.push({
                        idNumber: user.idNumber,
                        username: user.username,
                        email: user.email
                    })
                    return userListData
                })
                return userList
            }
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async updateUserInfoService(userId, updatedUserData) {
        try {
            const userDB = await DAO.getAll()
            const requestedUser = await DAO.geById(userId)
            if (requestedUser == null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                const updatedUser = {
                    idNumber: requestedUser.idNumber,
                    username: updatedUserData.username,
                    password: updatedUserData.password,
                    email: updatedUserData.email,
                    cart: requestedUser.cart
                }
                userDB.splice(requestedUser, 1)
                const updatedUserDB = [...userDB, updatedUser]
                await DAO.modifyDB(updatedUserDB)
                Logger.Logger.LoggerInfo.info(`INFO: Datos de usuario ${newUser.username} actualizados correctamente. ` + new Date().toLocaleTimeString())
                return `Datos de usuario ${newUser.username} actualizados correctamente.`
            } 
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async deleteUserByIdService(userId) {
        try {
            const userDB = await DAO.getAll()
            const requestedUser = await DAO.geById(userId)
            if (requestedUser == null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                const updatedUserDB = userDB.splice(requestedUser, 1)
                await DAO.modifyDB(updatedUserDB)
                Logger.Logger.LoggerInfo.info(`INFO: Se eliminó un usuario ${newUser.username}. ` + new Date().toLocaleTimeString())
                return `Se eliminó un usuario ${newUser.username}.`
            } 
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async deleteAllUsersService() {
        try {
            const userDB = await DAO.getAll()
            if (userDB.length == 0) {
                Logger.Logger.LoggerInfo.info('INFO: No hay usuarios registrados. ' + new Date().toLocaleTimeString())
                return 'No hay usuarios registrados.'
            } else {
                const updatedUserDB = []
                await DAO.modifyDB(updatedUserDB)
                Logger.Logger.LoggerInfo.info('INFO: Se eliminaron todos los usuarios registrados. ' + new Date().toLocaleTimeString())
                return 'Se eliminaron todos los usuarios registrados.'
            } 
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async addProductToCartService(userId, productId, productQuantity) {
        try {
            const userDB = await DAO.getAll()
            const requestedUser = await DAO.geById(userId)
            const productToAdd = await ProductServices.getProductByIdService(productId)
            if (requestedUser == null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                if (productToAdd == 'No se encontró el producto solicitado.') {
                    Logger.Logger.LoggerInfo.info('INFO: No se encontró el producto solicitado. ' + new Date().toLocaleTimeString())
                    return 'No se encontró el producto solicitado.'
                } else {
                    const newProductData = {
                        timestamp: new Date().toLocaleTimeString,
                        productData: productToAdd,
                        quantity: productQuantity
                    }
                    const updatedUser = {
                        idNumber: requestedUser.idNumber,
                        username: requestedUser.username,
                        password: requestedUser.password,
                        email: requestedUser.email,
                        cart: [...requestedUser.cart, newProductData]
                    }
                    userDB.splice(requestedUser, 1)
                    const updatedUserDB = [...userDB, updatedUser]
                    await DAO.modifyDB(updatedUserDB)
                    Logger.Logger.LoggerInfo.info(`INFO: Datos de usuario ${newUser.username} actualizados correctamente. ` + new Date().toLocaleTimeString())
                    return `Se agregó ${productToAdd.name} a tu carrito.`
                }
            } 
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async updateProductInCartService(userId, productId, productQuantity) {
        try {
            const userDB = await DAO.getAll()
            const requestedUser = await DAO.geById(userId)
            const productToModify = await ProductServices.getProductByIdService(productId)
            if (requestedUser == null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                if (productToModify == 'No se encontró el producto solicitado.') {
                    Logger.Logger.LoggerInfo.info('INFO: No se encontró el producto solicitado. ' + new Date().toLocaleTimeString())
                    return 'No se encontró el producto solicitado.'
                } else {
                    const updatedProductData = {
                        timestamp: new Date().toLocaleTimeString,
                        productData: productToModify,
                        quantity: productQuantity
                    }
                    const cart = []
                    const updatedCart = requestedUser.cart.forEach(product => {
                        if (product.productData.idNumber != productId) {
                            cart.push(product)
                        }
                        return cart
                    })
                    const updatedUser = {
                        idNumber: requestedUser.idNumber,
                        username: requestedUser.username,
                        password: requestedUser.password,
                        email: requestedUser.email,
                        cart: [...updatedCart, updatedProductData]
                    }
                    userDB.splice(requestedUser, 1)
                    const updatedUserDB = [...userDB, updatedUser]
                    await DAO.modifyDB(updatedUserDB)
                    Logger.Logger.LoggerInfo.info(`INFO: Datos de usuario ${newUser.username} actualizados correctamente. ` + new Date().toLocaleTimeString())
                    return `Tenés ${productQuantity} unidades de ${productToAdd.name} en tu carrito.`
                } 
            }
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async getProductsInCartService(userId) {
        try {
            const requestedUser = await DAO.geById(userId)
            if (requestedUser == null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                if (requestedUser.cart.length == 0) {
                    return 'Tu carrito está vacío.'
                } else {
                    const userData = {
                        idNumber: requestedUser.idNumber,
                        cart: requestedUser.cart
                    }
                    return userData
                }
            }
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async deleteProductFromCartService(userId, productId) {
        try {
            const userDB = await DAO.getAll()
            const requestedUser = await DAO.geById(userId)
            if (requestedUser == null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                const cart = []
                const updatedCart = requestedUser.cart.forEach(product => {
                    if (product.productData.idNumber != productId) {
                        cart.push(product)
                    }
                    return cart
                })
                const updatedUser = {
                    idNumber: requestedUser.idNumber,
                    username: requestedUser.username,
                    password: requestedUser.password,
                    email: requestedUser.email,
                    cart: [...updatedCart]
                }
                userDB.splice(requestedUser, 1)
                const updatedUserDB = [...userDB, updatedUser]
                await DAO.modifyDB(updatedUserDB)
                Logger.Logger.LoggerInfo.info(`INFO: Datos de usuario ${newUser.username} actualizados correctamente. ` + new Date().toLocaleTimeString())
                return `Tenés ${productQuantity} unidades de ${productToAdd.name} en tu carrito.` 
            }
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async emptyCartService(userId) {
        try {
            const userDB = await DAO.getAll()
            const requestedUser = await DAO.geById(userId)
            if (requestedUser == null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                const updatedUser = {
                    idNumber: requestedUser.idNumber,
                    username: requestedUser.username,
                    password: requestedUser.password,
                    email: requestedUser.email,
                    cart: []
                }
                userDB.splice(requestedUser, 1)
                const updatedUserDB = [...userDB, updatedUser]
                await DAO.modifyDB(updatedUserDB)
                Logger.Logger.LoggerInfo.info(`INFO: Datos de usuario ${newUser.username} actualizados correctamente. ` + new Date().toLocaleTimeString())
                return `Tu carrito está vacío.`
            } 
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    static getInstance() {
        if(!UserServicesInstance) {
            UserServicesInstance = new UserServices()
        }

        return UserServicesInstance
    }
}

export default UserServicesInstance = new UserServices()