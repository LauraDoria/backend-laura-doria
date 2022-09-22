const Express = require('express')
const Path = require('path');

const ExpressStatic = app.use(Express.static(Path.join(__dirname, '../public/views')))

export default ExpressStatic