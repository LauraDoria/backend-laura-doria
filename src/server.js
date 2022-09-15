//Require libraries
const express = require('express')
const session = require('express-session')
const mongoStore = require('connect-mongo')
const router = require('../routes/routerIndex')
const path = require('path')

//Instance server
const app = express()
const PORT = 6379

//Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views'))

//Middlewares
app.use(express.static(path.join(__dirname, '../public/views')))
app.get('/', (req, res) => {
    res.render('login')
})
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', router)
app.use(session({
    store: mongoStore.create({
        mongoUrl: 'mongodb+srv://laudoria94:<password>@cluster0.30tuyll.mongodb.net/?retryWrites=true&w=majority',
        dbName: 'eCommerceBackendLauraDoria',
        collectionName: 'sessions',
        stringify: true
    }),
    secret: 'coderhouse',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 60000}
}))

//Server UP
httpServer.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
})
//Error
httpServer.on("error", (error) => {
    console.error( `Se produjo un error: ${error}.`)
}) 