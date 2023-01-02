//Imports
const Compression = require('compression')
const Cors = require('cors')
const {corsOptions} = require('./Config/Cors/CorsConfig')
const {Env} = require('./Config/config')
const Express = require('express')
const http = require('http')
const {Logger} = require('./Utils/Logger')
const {MainRouter} = require('./Router/routerIndex')
//const {Passport} = require('./Config/Passport/PassportConfig')
//const Session = require('express-session')
//const {sessionConfig} = require('./Config/Session/SessionConfig')
const {Server} = require('socket.io')

//Instance server 
const app = Express()
const PORT = Env.PORT

//Websocket chat
const server = http.createServer(app)
const io = new Server(server)
io.on('connection', (socket) => {
    Logger.LoggerInfo.info(`New connection. ${new Date().toLocaleTimeString()}`)
    io.emit('incomingMessage', 'Nuevo usuario en línea. ' + new Date().toLocaleTimeString())
    socket.on('message', (newMessage) => {
        Logger.LoggerInfo.info(`${newMessage} ${new Date().toLocaleTimeString()}`)
        io.emit('incomingMessage', newMessage + new Date().toLocaleTimeString())
    })
    socket.on('disconnect', () => {
        Logger.LoggerInfo.info(`User disconnected. ${new Date().toLocaleTimeString()}`)
        io.emit('incomingMessage', 'Usuario se desconectó. ' + new Date().toLocaleTimeString())
    })
})

//Router
app.use('/', MainRouter)

//Middlewares
app.use(Compression())
app.use(Cors(corsOptions))
app.use(Express.json())
app.use(Express.static(Env.STATIC))
app.use(Express.urlencoded({extended: true}))
//app.use(Session(sessionConfig))
//app.use(Passport)

//Template engine
app.set('view engine', 'ejs');
app.set('views', Env.STATIC)

//Server UP
server.listen(PORT, () => {
    Logger.LoggerInfo.info(`Server up on port ${PORT}. ${new Date().toLocaleTimeString()}`)
})

//Error
server.on('error', (error) => {
    Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
})