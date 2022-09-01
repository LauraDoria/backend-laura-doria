//Require libraries
const express = require('express')
const {Server: IOServer, Socket} = require('socket.io')
const {Server: HttpServer} = require('http')

const PERS = process.env.PERS

const router = require('./routerDB')
const path = require('path');
const multer = require('multer')
const admin = require('firebase-admin');
const { log } = require('console');


//Firebase
const serviceAccount = re('../DB/firebase/backend-raw-firebase-adminsdk-zm03s-4344c01459.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://backend-raw.firebaseio.com'
})

//Instance server
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 8080

//Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views'))

//Middlewares
app.use(express.static(path.join(__dirname, '../public/views')))
app.get('/', (req, res) => {
    res.render('home')
})
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', router)

//Websocket chat
const messageHistory = [
    {user: 'user1', message: 'Hola!'},
    {user: 'user2', message: 'Cómo va?'},
    {user: 'user3', message: 'Bien, ustedes?'}
]
fs.writeFileSync('./chatHistory.txt', JSON.stringify(messageHistory, null, 2), 'utf-8')
io.on('connection', (socket) => {
   console.log('New user connected');
   socket.emit('showMessages', messageHistory)

   socket.on('newMessage', (data) => {
       messageHistory.push(data);
       fs.writeFileSync('./chatHistory.txt', JSON.stringify(messageHistory, null, 2), 'utf-8')
       io.sockets.emit('showMessages', messageHistory);
   })
   socket.on('disconnect', () => console.log('User disconnected'))
})

//Server UP
httpServer.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
})
//Error
httpServer.on("error", (error) => {
    console.log( `Se produjo un error: ${error}`)
}) 

/*
La entrega tiene que tener 4 versiones:
-memoria: guardar en array
-archivo: guardar en filesystem
-mongoose: guardar en mongoose con atlas
-firebase: guardar en firestore de firebase
-sql: guardar en mariaDB o sql (opcional)

carpeta 'contenedores':
-una versión del archivo de la clase contenedor por
cada método de persistencia
-clase contenedor = clase padre
-cada una hereda a clases hijas carrito y producto

carpeta 'dao'
-subcarpeta 'carrito' con las 4 versiones de la clase hija carrito
-subcarpeta 'producto' con las 4 versiones de la clase hija productos
-heredan de su correspondiente clase padre
-lo que sea propio únicamente de la clase hija se define dentro de la misma

.env (variables de entorno)
-instalar: npm i dotenv
-variable PERS (persistencia)
-usa un contenedor u otro según lo que indique PERS
import dotenv from 'dotenv'
dotenv.config()
const PERS = process.env.PERS (tomar el valor de 
la variable .env y usarlo para definir diferentes
casos que usen diferentes métodos de persistencia)
*/