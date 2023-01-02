const {Env} = require('../config')
const {initializeApp} = require('firebase/app')
const {getFirestore} = require('firebase/firestore')

const firebaseConfig = {
  apiKey: Env.API_KEY,
  authDomain: Env.AUTH_DOMAIN,
  projectId: Env.PROJECT_ID,
  storageBucket: Env.STORAGE_BUCKET,
  messagingSenderId: Env.MESSAGING_SENDER_ID,
  appId: Env.APP_ID,
  measurementId: Env.MEASURMENT_ID
}

const firebase = initializeApp(firebaseConfig)
const firestoreDB = getFirestore(firebase)

module.exports = {firestoreDB}