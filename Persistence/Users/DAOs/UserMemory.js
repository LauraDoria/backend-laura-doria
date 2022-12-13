import UsersDAOFactory from "../UserFactory"
import { UserDB } from "../../../DB/Memory/memoryDB"

let MemoryUsersDAO = null

class MemoryUsersDAOFactory extends UsersDAOFactory {
    constructor() {
        super()
    }

    modifyDB(typeOfRequest, isMultiple, userId, userData, isProduct) {
        try {
            /*
            Si la req es de tipo post, creo un nuevo usuario con los datos
            recibidos en userData y hago push a la base de datos en memoria
            userId, productId y isMultiple son nulas por que no se utilizan

            Si la req es de tipo put, defino si existe un valor para productId
            o si es nulo, si es nulo quiere decir que la modificación corresponde
            a los datos de cuenta del usuario, si no lo es, lo que se está modificando
            es el carrito de compras, las transformaciones dentro del carrito se relizan
            en la capa services
            Llamo al usuario por su id y actualizo las propiedades de objeto correspondientes
            con los nuevos valores recibidos en userData
            isMultiple no se utiliza

            Si la req es de tipo delete, defino si el valor de isMultiple es igual a YES,
            en ese caso se borrarán todos los usuarios registrados en la base, asignándole
            el valor de array vacío a UserDB (sólo con permiso de administrador)
            Caso contrario estamos borrando un usuario que buscamos por su id, con método splice
            En en el DAO UserFile se trabaja de igual manera pero la base de datos se llama
            desde fs y al final es necesario utilizar el comando writeFileSync para sobreescribir
            los cambios
            */
            if (typeOfRequest == 'POST') {
                UserDB.push(userData)
            } else if (typeOfRequest == 'PUT') {
                if (!isProduct) {
                    const requestedUser = this.geById(userId)
                    if (userData.isAdmin == null) {
                        requestedUser.username = userData.username
                        requestedUser.name = userData.name
                        requestedUser.password = userData.password
                        requestedUser.email = userData.email
                    } else {
                        requestedUser.isAdmin = userData.isAdmin
                    }
                    /*
                    Alternativa:
                    if (userData.isAdmin == null) {
                        const updatedUser = {
                            idNumber: requestedUser.idNumber,
                            username: userData.username,
                            name: userData.name,
                            password: userData.password,
                            email: userData.email,
                            isAdmin: requestedUser.isAdmin,
                            cart: requestedUser.cart
                        }
                    } else {
                        const updatedUser = {
                            idNumber: requestedUser.idNumber,
                            username: requestedUser.username,
                            name: requestedUser.name,
                            password: requestedUser.password,
                            email: requestedUser.email,
                            isAdmin: userData.isAdmin,
                            cart: requestedUser.cart
                        }
                    }
                    UserDB.splice(requestedUser, 1)
                    UserDB.push(updatedUser)
                    */
                } else {
                    const requestedUser = this.geById(userId)
                    requestedUser.cart = userData.cart
                    /*
                    Alternativa:
                    const updatedUser = {
                        idNumber: requestedUser.idNumber,
                        username: requestedUser.username,
                        name: requestedUser.name,
                        password: requestedUser.password,
                        email: requestedUser.email,
                        isAdmin: requestedUser.isAdmin,
                        cart: userData.cart
                    }
                    UserDB.splice(requestedUser, 1)
                    UserDB.push(updatedUser)
                    */
                }
            } else {
                if (!isMultiple) {
                    const requestedUser = this.geById(userId)
                    UserDB.splice(requestedUser, 1)
                } else {
                    UserDB = []
                }
            }
            Logger.Logger.LoggerInfo.info(`INFO: Base de datos de usuarios modificada correctamente. ` + new Date().toLocaleTimeString())
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    geById(userId) {
        try {
            const requestedUser = UserDB.forEach(user => {
                if (user.idNumber == userId) {
                    return user
                }
            })
            return requestedUser
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    getAll() {
        try {
            return UserDB
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    static getInstance() {
        if(!MemoryUsersDAO) {
            MemoryUsersDAO = new MemoryUsersDAOFactory()
        }

        return MemoryUsersDAO
    }
}

export default MemoryUsersDAO = new MemoryUsersDAOFactory()