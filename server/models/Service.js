const mongoose = require('mongoose')
const { Schema, model } = mongoose

const serviceSchema = new Schema({
    name: String,
    desc: String,
    price: Number,
    imgURL: String,
    time: Number
})

const Service = model('Service', serviceSchema)
module.exports = Service