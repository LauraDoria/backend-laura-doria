//Import libraries
import express, { urlencoded, json, static } from 'express'
import { Server as HttpServer } from 'http'
import router from './server'
const path = require('path');

//Instance server
const app = express()
const httpServer = new HttpServer(app)
const PORT = 8080

//Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views'))

//Middlewares
app.use(express.static(path.join(__dirname, '../public/views')))
app.get('/', (req, res) => {
    res.render('home')
})
app.use(urlencoded({extended: true}))
app.use(json())
app.use('/api', router)

//Server UP
httpServer.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
})
//Error
httpServer.on("error", (error) => {
    console.error( `Se produjo un error: ${error}`)
}) 