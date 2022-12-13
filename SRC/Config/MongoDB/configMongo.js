import Config from '../config'
import mongoose from "mongoose"

const MongooseConfig = mongoose.connect(Config.Env.MONGO)

export default MongooseConfig