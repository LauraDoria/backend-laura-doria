const {firestoreDB} = require('../../../Config/Firebase/FirebaseConfig')
const { getDocs, collection, query, where, orderBy } = require('firebase/firestore')
const {Logger} = require('../../../Utils/Logger')
const {UsersDAOFactory} = require('../UserFactory')


//getDocs(collection(firestoreDB), 'users')
//const queryUsers = db.collection('users')


class FirebaseUsersDAOFactory extends UsersDAOFactory {
    constructor() {
        super()
    }

    async modifyDB(typeOfRequest, isMultiple, userId, userData, isProduct) {
        try {
            if (typeOfRequest == 'POST') {
                const doc = queryUsers.doc(`${userData.idNumber}`)
                await doc.create({
                    username: userData.username,
                    name: userData.name,
                    password: userData.password,
                    email: userData.email,
                    isAdmin: userData.isAdmin,
                    cart: userData.cart
                })
            } else if (typeOfRequest == 'PUT') {
                if (!isProduct) {
                    const doc = queryUsers.doc(`${userId}`)
                    if (userData.isAdmin == null) {
                        await doc.update({
                            username: userData.username,
                            name: userData.name,
                            password: userData.password,
                            email: userData.email
                        })
                    } else {
                        await doc.update({
                            isAdmin: userData.isAdmin
                        })
                    }
                } else {
                    const doc = queryUsers.doc(`${userData.idNumber}`)
                    await doc.update({cart: userData.cart})
                }
            } else {
                if (!isMultiple) {
                    const querySnapshot = await queryUsers.get()
                    let response = querySnapshot.docs
                    response.map((doc) => {
                        doc.delete()
                    })
                } else {
                    const doc = queryUsers.doc(`${userId}`)
                    doc.delete()
                }
            }
            Logger.LoggerInfo.info(`INFO: Base de datos de usuarios modificada correctamente. ` + new Date().toLocaleTimeString())
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async geById(userId) {
        try {
            const doc = queryUsers.doc(`${productId}`)
            const response = await doc.get()
            const requiredUser = response.data()
            return requiredUser
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    async getAll() {
        try {
            const querySnapshot = await queryUsers.get()
            const response = querySnapshot.docs
            const userList = response.map((doc) => {
                users.push(...users, doc.data())
                return users
            })
            return userList
        } catch (error) {
            Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        }
    }

    static getInstance() {
        if(!FirebaseUsersDAO) {
            FirebaseUsersDAO = new FirebaseUsersDAOFactory()
        }

        return FirebaseUsersDAO
    }
}
const FirebaseUsersDAO = new FirebaseUsersDAOFactory()

module.exports = {FirebaseUsersDAO}