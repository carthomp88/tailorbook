const mongoose = require('mongoose')
const { Schema, model } = mongoose

const landingSchema = new Schema({
    name: String,
    hours: Object,
    info: String,
    email: String,
    phone: Number,
    social: String,
    imgURL1: String,
    imgURL2: String
})

const Landing = model('Landing', landingSchema)
module.exports = Landing