const Compression = require('compression')

const Gzip = app.use(Compression())

export default Gzip