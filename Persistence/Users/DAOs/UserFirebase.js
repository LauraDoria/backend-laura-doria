import { firestore } from "firebase-admin"
import UsersDAOFactory from "../UserFactory"
const db = firestore()
const queryUsers = db.collection('users')

let FirebaseUsersDAO = null

class FirebaseUsersDAOFactory extends UsersDAOFactory {
    constructor() {
        super()
    }

    async modifyDB(updatedData) {
        try {
            /*
            Todos los DAOs trabajan con 3 funciones:
                -Llamar todos los elementos de la BD
                -Llamar un único elemento de la BD por su id
                -Modificar la base de datos
            En los DAO de memoria y archivo se utiliza una única función
            para modificar la BD
            Firebase y Mongo utilizan métodos específicos para:
                -Crear nuevo elemento
                -Modificar un elemento
                -Eliminar un elemento
                -Eliminar todos los elementos
            Por lo que los DAOs de Firebase y Mongo, dentro del método modifyDB
            se debe considerar cada unos de esos casos
            -Mudar parte del código de la capa de servicios al DAO
            -Plantear diferentes casos dentro de modifyDB
            CREAR NUEVO ELEMENTO: const newProduct = await doc.create({updatedData})
            ACTUALIZAR ELEMENTO: let item = await doc.update({updatedData})
            ELIMINAR UN ELEMENTO: const item = await doc.delete()
            ELIMINAR TODOS: 
            let docs = querySnapshot.docs
            docs.map((doc) => {
                doc.delete()
            })
            ACTUALIZAR PROPIEDAD CART: await cart.update({products: newCart})
            */
            Logger.Logger.LoggerInfo.info(`INFO: Base de datos de usuarios modificada correctamente. ` + new Date().toLocaleTimeString())
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async geById(userId) {
        try {
            
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async getAll() {
        try {
            
        } catch (error) {
            Logger.Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    static getInstance() {
        if(!FirebaseUsersDAO) {
            FirebaseUsersDAO = new FirebaseUsersDAOFactory()
        }

        return FirebaseUsersDAO
    }
}

export default FirebaseUsersDAO = new FirebaseUsersDAOFactory()
