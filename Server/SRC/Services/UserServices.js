const {Env} = require('../Config/config')
const {GetCartDTO} = require('../DTOs/Users/GetCartDTO')
const {GetUserDTO} = require('../DTOs/Users/GetUserDTO')
const {GetUserListDTO} = require('../DTOs/Users/GetUserList')
const {Logger} = require('../Utils/Logger')
const {MaxIdCalculator} = require('../Utils/Calculator')
const {PostUserDTO} = require('../DTOs/Users/PostUserDTO')
const {ProductServices} = require('./ProductServices')
const {PutAccountSettingsDTO} = require('../DTOs/Users/PutAccountSettings')
const {PutCartDTO} = require('../DTOs/Users/PutCartDTO')
const {PutUserPermitsDTO} = require('../../DTOs/Users/PutUserPermits')
const {FileUsersDAO} = require('../Persistence/Users/DAOs/UserFile')
const {FirebaseUsersDAO} = require('../Persistence/Users/DAOs/UserFirebase')
const {MemoryUsersDAO} = require('../Persistence/Users/DAOs/UserMemory')
const {MongoDBUsersDAO} = require('../Persistence/Users/DAOs/UserMongoDB')

//Establezco 'MEMORY' como default setting en la variable PERS. Ver dotenv, .env y por qué no toma los valores de DAO
let DAO = MemoryUsersDAO
if(Env.PERS === 'FILE') {
    DAO = FileUsersDAO
}
if(Env.PERS === 'FIREBASE') {
    DAO = FirebaseUsersDAO
}
if(Env.PERS === 'MONGODB') {
    DAO = MongoDBUsersDAO
}

class UserServicesContainer {

    constructor() {

    }

    //Registrar un nuevo usuario.
    async createUserService(userData) {
        try {
            const idNumber = MaxIdCalculator(await DAO.getAll()) + 1
            const newUser = PostUserDTO.DTO(userData, idNumber, null)
            await DAO.modifyDB('POST', null, null, newUser, null)
            Logger.LoggerInfo.info(`INFO: Nuevo usuario ${newUser.email} registrado. ` + new Date().toLocaleTimeString())
            return `Usuario ${newUser.username} registrado correctamente.`
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    //Obtener usuario por su id.
    async getUserByIdService(userId) {
        try {
            const requestedUser = await DAO.geById(userId)
            if (requestedUser == null) {
                Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                const userData = GetUserDTO.DTO(requestedUser, null, null)
                return userData
            }
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    //Obtener listado de usuarios.
    async getAllUsersService() {
        try {
            const userDB = await DAO.getAll()
            if (userDB.length == 0) {
                Logger.LoggerInfo.info('INFO: No hay usuarios registrados. ' + new Date().toLocaleTimeString())
                return 'No hay usuarios registrados.'
            } else {
                const userList = GetUserListDTO.DTO(userDB, null, null)
                return userList
            }
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    //Actualizar datos de usuario ya registrado.
    async updateUserInfoService(userId, userData) {
        try {
            const requestedUser = await DAO.geById(userId)
            if (requestedUser == null) {
                Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                let updatedUser = ''
                if (userData.isAdmin) {
                    updatedUser = PutUserPermitsDTO.DTO(userData, null, null)
                } else {
                    updatedUser = PutAccountSettingsDTO.DTO(userData, null, null)
                }
                await DAO.modifyDB('PUT', null, userId, updatedUser, null)
                Logger.LoggerInfo.info(`INFO: Datos de usuario ${newUser.username} actualizados correctamente. ` + new Date().toLocaleTimeString())
                return `Datos de usuario ${newUser.username} actualizados correctamente.`
            } 
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    //Eliminar usuario.
    async deleteUserByIdService(userId) {
        try {
            const requestedUser = await DAO.geById(userId)
            if (requestedUser == null) {
                Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                await DAO.modifyDB('DELETE', null, userId, null, null)
                Logger.LoggerInfo.info(`INFO: Se eliminó un usuario ${newUser.username}. ` + new Date().toLocaleTimeString())
                return `Se eliminó un usuario ${requestedUser.username}.`
            } 
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    //Eliminar listado de usuarios.
    async deleteAllUsersService() {
        try {
            const userDB = await DAO.getAll()
            if (userDB.length == 0) {
                Logger.LoggerInfo.info('INFO: No hay usuarios registrados. ' + new Date().toLocaleTimeString())
                return 'No hay usuarios registrados.'
            } else {
                await DAO.modifyDB('DELETE', 'YES', null, null, null)
                Logger.LoggerInfo.info('INFO: Se eliminaron todos los usuarios registrados. ' + new Date().toLocaleTimeString())
                return 'Se eliminaron todos los usuarios registrados.'
            } 
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    //Agregar productos al carrito.
    async addProductToCartService(userId, productId, productQuantity) {
        try {
            const requestedUser = await DAO.geById(userId)
            const productToAdd = await ProductServices.getProductByIdService(productId)
            if (requestedUser == null) {
                Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                if (productToAdd == 'No se encontró el producto solicitado.') {
                    Logger.LoggerInfo.info('INFO: No se encontró el producto solicitado. ' + new Date().toLocaleTimeString())
                    return 'No se encontró el producto solicitado.'
                } else {
                    const updatedUser = [...requestedUser, PutCartDTO.DTO(productToAdd, null, productQuantity)]
                    await DAO.modifyDB('PUT', null, userId, updatedUser, 'YES')
                    Logger.LoggerInfo.info(`INFO: Datos de usuario ${newUser.username} actualizados correctamente. ` + new Date().toLocaleTimeString())
                    return `Se agregó ${productToAdd.name} a tu carrito.`
                }
            } 
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    //Modificar cantidad de unidades de un producto ya en carrito.
    async updateProductInCartService(userId, productId, productQuantity) {
        try {
            const requestedUser = await DAO.geById(userId)
            const productToModify = await ProductServices.getProductByIdService(productId)
            if (requestedUser == null) {
                Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                if (productToModify == 'No se encontró el producto solicitado.') {
                    Logger.LoggerInfo.info('INFO: No se encontró el producto solicitado. ' + new Date().toLocaleTimeString())
                    return 'No se encontró el producto solicitado.'
                } else {
                    const cart = []
                    const updatedCart = requestedUser.cart.forEach(product => {
                        if (product.productData.idNumber != productId) {
                            cart.push(product)
                        }
                        return cart
                    })
                    const updatedUser = {
                        cart: [...updatedCart, PutCartDTO.DTO(productToModify, null, productQuantity)]
                    }
                    await DAO.modifyDB('PUT', null, userId, updatedUser, 'YES')
                    Logger.LoggerInfo.info(`INFO: Datos de usuario ${newUser.username} actualizados correctamente. ` + new Date().toLocaleTimeString())
                    return `Tenés ${productQuantity} unidades de ${productToAdd.name} en tu carrito.`
                } 
            }
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    //Obtener todos los productos guardados en el carrito.
    async getProductsInCartService(userId) {
        try {
            const requestedUser = await DAO.geById(userId)
            if (requestedUser == null) {
                Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                if (requestedUser.cart.length == 0) {
                    return 'Tu carrito está vacío.'
                } else {
                    const userData = {
                        idNumber: requestedUser.idNumber,
                        cart: GetCartDTO.DTO(requestedUser, null, null)
                    }
                    return userData
                }
            }
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    //Eliminar producto del carrito.
    async deleteProductFromCartService(userId, productId) {
        try {
            const requestedUser = await DAO.geById(userId)
            if (requestedUser == null) {
                Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
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
                    cart: [...updatedCart]
                }
                await DAO.modifyDB('PUT', null, userId, updatedUser, 'YES')
                Logger.LoggerInfo.info(`INFO: Datos de usuario ${newUser.username} actualizados correctamente. ` + new Date().toLocaleTimeString())
                return `Tenés ${productQuantity} unidades de ${productToAdd.name} en tu carrito.` 
            }
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    //Vaciar carrito.
    async emptyCartService(userId) {
        try {
            const requestedUser = await DAO.geById(userId)
            if (requestedUser == null) {
                Logger.LoggerInfo.info('INFO: No se encontró el usuario. ' + new Date().toLocaleTimeString())
                return 'No se encontró el usuario.'
            } else {
                const updatedUser = {
                    cart: []
                }
                await DAO.modifyDB('PUT', null, userId, updatedUser, 'YES')
                Logger.LoggerInfo.info(`INFO: Datos de usuario ${newUser.username} actualizados correctamente. ` + new Date().toLocaleTimeString())
                return `Tu carrito está vacío.`
            } 
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    static getInstance() {
        if(!UserServices) {
            UserServices = new UserServicesContainer()
        }

        return UserServices
    }
}

const UserServices = new UserServicesContainer()

module.exports = {UserServices}