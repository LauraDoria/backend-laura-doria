const Dotenv = require('dotenv') 
const Minimist = require('minimist')
const Path = require('path')

//Todos los archivos de configuración, incluyendo los de conexión a base de datos, van en la carpeta config
Path.join
Dotenv.config({Path: '../../.env'})

const minimistOptions = {default: {port: 8080}}
const PORT = Minimist(process.argv.slice(2), minimistOptions) || 3000

const Env = {
    GOOGLEID: process.env.GOOGLEID,
    GOOGLESECRET: process.env.GOOGLESECRET,
    GOOGLEURL: process.env.GOOGLEURL,
    HOST: process.env.HOST || '127.0.0.1',
    MONGO: process.env.MONGO,
    NODE_ENV: process.env.NODE_ENV || 'DEV',
    PORT:  PORT,
    PERS: 'MEMORY',
    SESSION: process.env.SESSION,
    STATIC: process.env.STATIC
}

export default Env