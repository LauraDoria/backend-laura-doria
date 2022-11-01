const Express = require('express')

const ExpressUrlEncoded = app.use(Express.urlencoded({extended: true}))

export default ExpressUrlEncoded