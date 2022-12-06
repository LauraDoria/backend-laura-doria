const Mongoose = require("mongoose")
const Config = require('')

const MongooseConfig = Mongoose.connect(Config.Env.MONGO)

export default MongooseConfig