const mongoose = require('mongoose')
const { Schema, model } = mongoose

const daySchema = new Schema({
    name: String,
    open: String,
    close: String
})

const Day = model('Day', daySchema)
module.exports = Day