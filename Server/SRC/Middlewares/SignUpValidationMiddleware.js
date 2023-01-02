const {UserControllers} = require('../Controllers/UserControllers')

const SignUpValidationMiddleware = (req, res, next) => {
    const username = req.body.username
    const email = req.body.email
    const registeredUsers = UserControllers.getAllUsers()
    registeredUsers.forEach(user => {
        if (user.username == username) {
            res.render('register', {message: 'El nombre de usuario ingresado ya está en uso.'})
        } else if (user.email == email) {
            res.render('register', {message: 'El correo ingresado ya está en uso.'})
        } else {
            next()
        }
    })
}

module.exports = {SignUpValidationMiddleware}