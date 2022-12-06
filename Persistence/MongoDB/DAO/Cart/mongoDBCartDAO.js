const contenedorMongoDB = require('../../Container/mongoDBContainer');

class MongoDBCartDAO extends contenedorMongoDB {
    constructor() {
        super()
    }
}

export {MongoDBCartDAO}