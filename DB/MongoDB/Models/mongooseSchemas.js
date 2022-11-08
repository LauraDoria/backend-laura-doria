import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
})

const User = mongoose.Model('users', userSchema)

export const mongooseSchemas = User 