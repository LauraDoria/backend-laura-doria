const Bcrypt = require('bcrypt')
const {Env} = require('../Config/config')
const JWT = require('jsonwebtoken')
const {Logger} = require('../Utils/Logger')
const {UserControllers} = require('../Controllers/UserControllers')

const JWTLoginMiddleware = (req, res, next) => {
    const {username, password} = req.body
    const requestedUser = UserControllers.getAllUsers().forEach(user => {
        if (username == user.username) return user
    })
    if (!requestedUser) res.redirect('/login', {message: 'El usuario ingresado no existe.'})
    Bcrypt.compare(password, requestedUser.password, (error, isMatch) => {
        if (error) Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        if (!isMatch) {
            res.redirect('/login', {message: 'La contraseña ingresada no es correcta.'})
        } else {
            const userData = {
                userId: requestedUser.idNumber,
                username: requestedUser.username,
                email: requestedUser.email,
                isAdmin: requestedUser.isAdmin
            }
            JWT.sign({userToken: userData}, Env.JWTSECRET, {expiresIn: '200s'}, (error, token) => {
                if (error) Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
                //Con localStorage
                localStorage.setItem('userJWTToken', JSON.stringify(token))
                localStorage.setItem('isAuth', JSON.stringify('YES'))
                //Con request/response
                /*res.json({
                    token: token
                })*/
            })
            next()
        }
    })
}

const JWTAuthenticationMiddleware = (req, res, next) => {
    //JWT desde encabezado de solicitud
    /*const requestHeader = req.headers['authorization'] //authorization <token>
    const bearerToken = ''
    if (typeof requestHeader != 'undefined') {
        bearerToken = requestHeader.split(' ')[1] //<token>
        JWT.verify(bearerToken, Env.JWTSECRET, (error, authenticatedUser) => {
            if (error) {
                if (error) Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
                res.redirect('/error', {message: '401 Unauthorized. No estás autorizado para ver está página. :('})
            } else {
                res.json({authenticatedUser})
            }
        })
        next()
    } else {
        res.redirect('/', {Message: 'Iniciá sesión o registrate para ver esta página.'})
    }*/

    //JWT desde localStorage
    const bearerToken = JSON.parse(localStorage.getItem('userJWTToken'))
    if (bearerToken) {
        JWT.verify(bearerToken, Env.JWTSECRET, (error, authenticatedUser) => {
            if (error) {
                if (error) Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
                res.redirect('/error', {message: '401 Unauthorized. No estás autorizado para ver está página. :('})
            } else {
                next()
            }
        })
    } else {
        res.redirect('/', {Message: 'Iniciá sesión o registrate para ver esta página.'})
    }
}

const JWTLogout = () => {
    const bearerToken = JSON.parse(localStorage.removeItem('userJWTToken'))
    localStorage.setItem('isAuth', JSON.stringify('NO'))
    if (!bearerToken) res.redirect('/')
}


module.exports = {JWTLoginMiddleware, JWTAuthenticationMiddleware, JWTLogout}