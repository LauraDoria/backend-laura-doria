const Dotenv = require('dotenv') 
const Minimist = require('minimist')

Dotenv.config()

const minimistOptions = {default: {port: 8080}}
const PORT = Minimist(process.argv.slice(2), minimistOptions) || 3000

export const Env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT:  PORT,
    MONGO: process.env.MONGO,
    STATIC: process.env.STATIC,
    SESSION: process.env.SESSION,
    GOOGLEID: process.env.GOOGLEID,
    GOOGLESECRET: process.env.GOOGLESECRET,
    GOOGLEURL: process.env.GOOGLEURL
}