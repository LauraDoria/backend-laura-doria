import Env from '../SRC/Config/config'
import IdCompare from '../SRC/Utils/IdCompare'
import Logger from '../SRC/Utils/Logger'
import ProductServices from './ProductServices'
import UserFile from '../Persistence/Users/DAOs/UserFile'
import UserFirebase from '../Persistence/Users/DAOs/UserFirebase'
import UserMemory from '../Persistence/Users/DAOs/UserMemory'
import UserMongoDB from '../Persistence/Users/DAOs/UserMongoDB'

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

    async createUserService(userData) {
        try {
            const userDB = await DAO.getAll()
            //Mudar a UserDTO
            const newUser = {
                idNumber: IdCompare(userDB) + 1,
                username: userData.username,
                name: userData.name,
                password: userData.password,
                email: userData.email,
                isAdmin: false,
                cart: []
            }
            await DAO.modifyDB('POST', null, null, newUser, null)
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
                //Mudar a UserDTO
                const userData = {
                    idNumber: requestedUser.idNumber,
                    username: requestedUser.username,
                    name: requestedUser.name,
                    email: requestedUser.email,
                    isAdmin: requestedUser.isAdmin,
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
                        //Mudar a UserDTO
                        idNumber: user.idNumber,
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isAdmin
                    })
                    return userListData
                })
                return userList
            }
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async updateUserInfoService(userId, userData) {
        try {
            const requestedUser = await DAO.geById(userId)
            if (requestedUser == null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                const updatedUser = {
                    //Mudar a UserDTO
                    username: userData.username,
                    name: userData.name,
                    password: userData.password,
                    email: userData.email,
                }
                await DAO.modifyDB('PUT', null, userId, updatedUser, null)
                Logger.Logger.LoggerInfo.info(`INFO: Datos de usuario ${newUser.username} actualizados correctamente. ` + new Date().toLocaleTimeString())
                return `Datos de usuario ${newUser.username} actualizados correctamente.`
            } 
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async deleteUserByIdService(userId) {
        try {
            const requestedUser = await DAO.geById(userId)
            if (requestedUser == null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                await DAO.modifyDB('DELETE', null, userId, null, null)
                Logger.Logger.LoggerInfo.info(`INFO: Se eliminó un usuario ${newUser.username}. ` + new Date().toLocaleTimeString())
                return `Se eliminó un usuario ${requestedUser.username}.`
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
                await DAO.modifyDB('DELETE', 'YES', null, null, null)
                Logger.Logger.LoggerInfo.info('INFO: Se eliminaron todos los usuarios registrados. ' + new Date().toLocaleTimeString())
                return 'Se eliminaron todos los usuarios registrados.'
            } 
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async addProductToCartService(userId, productId, productQuantity) {
        try {
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
                    //Mudar a ProductDTO
                    const newProductData = {
                        timestamp: new Date().toLocaleTimeString,
                        productData: productToAdd,
                        quantity: productQuantity
                    }
                    //Mudar a UserDTO
                    const updatedUser = {
                        cart: [...requestedUser.cart, newProductData]
                    }
                    await DAO.modifyDB('PUT', null, userId, updatedUser, 'YES')
                    Logger.Logger.LoggerInfo.info(`INFO: Datos de usuario ${newUser.username} actualizados correctamente. ` + new Date().toLocaleTimeString())
                    return `Se agregó ${productToAdd.name} a tu carrito.`
                }
            } 
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async updateProductInCartService(userId, userData, productId) {
        try {
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
                    //Mudar a ProductDTO
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
                    //Mudar a UserDTO
                    const updatedUser = {
                        cart: [...updatedCart, updatedProductData]
                    }
                    await DAO.modifyDB('PUT', null, userId, updatedUser, 'YES')
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
                    //Mudar a UserDTO
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
                //Mudar a UserDTO
                const updatedUser = {
                    cart: [...updatedCart]
                }
                await DAO.modifyDB('PUT', null, userId, updatedUser, 'YES')
                Logger.Logger.LoggerInfo.info(`INFO: Datos de usuario ${newUser.username} actualizados correctamente. ` + new Date().toLocaleTimeString())
                return `Tenés ${productQuantity} unidades de ${productToAdd.name} en tu carrito.` 
            }
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async emptyCartService(userId) {
        try {
            const requestedUser = await DAO.geById(userId)
            if (requestedUser == null) {
                Logger.Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                //Mudar a UserDTO
                const updatedUser = {
                    cart: []
                }
                await DAO.modifyDB('PUT', null, userId, updatedUser, 'YES')
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