const {Env} = require('../config')
const mongoose = require('mongoose')

const MongooseConnect = mongoose.connect(Env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const MongooseDisconnect = mongoose.disconnect()

module.exports = {MongooseConnect, MongooseDisconnect}