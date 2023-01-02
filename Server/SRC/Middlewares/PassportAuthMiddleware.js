const PassportAuthMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/', {Message: 'Iniciá sesión o registrate para ver esta página.'})
    }
}

const PassportLogout = (req, res) => {
    req.session.destroy((error) => {
        if (error) Logger.LoggerError.error( `ERROR: ${error}. ${new Date().toLocaleTimeString()}`)
        localStorage.setItem('isAuth', JSON.stringify('NO'))
        res.redirect('/')
    })
}

module.exports = {PassportAuthMiddleware, PassportLogout}