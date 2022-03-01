const {Schema, model} = require("mongoose")

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    avatar: { type: String, unique: false, required: false }
})

module.exports = model('User', UserSchema)