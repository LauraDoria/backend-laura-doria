const Mongoose = require("mongoose")
const Config = require('../config/config')

const MongooseConfig = Mongoose.connect(Config.Env.MONGO)

export default MongooseConfig