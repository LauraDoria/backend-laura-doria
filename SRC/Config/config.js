const Dotenv = require('dotenv') 
const Minimist = require('minimist')

Dotenv.config()

const minimistOptions = {default: {port: 8080}}
const PORT = Minimist(process.argv.slice(2), minimistOptions) || 3000

export const Env = {
    GOOGLEID: process.env.GOOGLEID,
    GOOGLESECRET: process.env.GOOGLESECRET,
    GOOGLEURL: process.env.GOOGLEURL,
    HOST: process.env.HOST || '127.0.0.1',
    MONGO: process.env.MONGO,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT:  PORT,
    PERS: MONGODB,
    SESSION: process.env.SESSION,
    STATIC: process.env.STATIC
}