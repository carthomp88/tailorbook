const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phonenum: Number,
    username: String
})

const User = model('User', userSchema)
module.exports = User