const {UserControllers} = require('../Controllers/UserControllers')

const AdminPermitsMiddleware = (req, res, next) => {
    const adminId = parseInt(req.param.adminId)
    const userPermits = UserControllers.getUserById(adminId).isAdmin
    if (userPermits == true) {
        next()
    } else {
        res.redirect('/error', {message: '401 Unauthorized. No estás autorizado para ver está página. :('})
    }
}

module.exports = {AdminPermitsMiddleware}