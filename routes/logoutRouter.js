//Require libraries
const express = require('express');
const {Router} = express
const logoutRouter = Router()

//Logout
logoutRouter.post('/home', (req, res) => {
    req.session.destroy(error => {
        if (!error){
            return res.render('login')
        } else  {
            console.log(`Error: ${error}`)
            return res.send('Ocurrió un error al cerrar sesión. Intentalo nuevamente.')
        }
    })
})

export default logoutRouter