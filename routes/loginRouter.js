//Require libraries
const express = require('express');
const {Router} = express
const loginRouter = Router()
const login = require('../utils/login')


//Login GET
loginRouter.get('/login', (req, res) => {
    res.render('login')
})

//login POST
loginRouter.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const isAdmin = login.authentication(username, password)
    if (isAdmin) {
        console.log('GET request succesful.')
        req.session.user = username
        req.session.password = password
        return res.render('home', {
            name: req.session.user
        })
    } else {
        console.log('Failed to GET. STATUS CODE 401: Unauthorized.');
        return res.status(401).render('unauthorized')
    }
})

export default loginRouter