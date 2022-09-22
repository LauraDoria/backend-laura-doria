//Require libraries
const Express = require('express')
const Path = require('path');

//Instance server 
const app = Express()
const PORT = 6379

//Template engine
app.set('view engine', 'ejs');
app.set('views', Path.join(__dirname, '../public/views'))

//Require Middlewares
const ExpressJson = require('../middlewares/expressJson')
const ExpressUrlEncoded = require('../middlewares/expressUrlEncoded')
const ExpressStatic = require('../middlewares/expressStatic')
const Session = require('../middlewares/session')
const Passport = require('../middlewares/passport')

//Router
const Router = require('../routes/routerIndex')

//DataBAse
const Mongoose = require('../db/config')

//Server UP
httpServer.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
})
//Error
httpServer.on("error", (error) => {
    console.error( `Se produjo un error: ${error}.`)
})

