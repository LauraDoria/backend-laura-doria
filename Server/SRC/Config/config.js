const Dotenv = require('dotenv')
const Path = require('path')

const envPath = Path.join(__dirname, '../.env')
Dotenv.config({path: envPath})



const Env = {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MEASURMENT_ID: process.env.MEASURMENT_ID,
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    FIREBASE_AUTH_URI: process.env.FIREBASE_AUTH_URI,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
    FIREBASE_CLIENT_X509_CERT_URL: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_TOKEN_URI: process.env.FIREBASE_TOKEN_URI,
    FIREBASE_TYPE: process.env.FIREBASE_TYPE,
    GOOGLEID: process.env.GOOGLEID,
    GOOGLESECRET: process.env.GOOGLESECRET,
    GOOGLEURL: process.env.GOOGLEURL,
    HOST: process.env.HOST,
    JWTSECRET: process.env.JWTSECRET,
    MONGOPASSWORD: process.env.MONGOPASSWORD,
    MONGODBNAME: process.env.MONGODBNAME,
    MONGOURI: process.env.MONGO,
    NODE_ENV: process.env.NODE_ENV,
    NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
    NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
    PORT: process.env.PORT,
    PERS:  process.env.PERS,
    SESSION: process.env.SESSION,
    STATIC: process.env.STATIC
}

module.exports = {Env}