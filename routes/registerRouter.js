const Passport = require('passport')
const Bcrypt = require('bcrypt')
const User = require('../models/mongooseSchemas')
const { Router } = require('express')

const registerRouter = Router()

//Rutas
registerRouter.get('/register', (req, res) => {
    res.render('register')
})

registerRouter.post('/register', Passport.authenticate('local'), (req, res) => {
    const {username, password, email} = req.body
    User.findOne({email}, async (error, user) => {
        if (error) console.error(error);
        if (user) {
            res.render('register-error')
        } else {
            const hashedPassword = await Bcrypt.hash(password, 10)
            const newUser = new User({
                username: username,
                password: hashedPassword,
                email: email
            })
            await User.save(newUser)
            res.redirect('login')
        }
    })
})

export default registerRouter