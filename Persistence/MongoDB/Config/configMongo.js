const Mongoose = require("mongoose")
const Config = require('../../../SRC/Config/config')

const MongooseConfig = Mongoose.connect(Config.Env.MONGO)

export default MongooseConfig