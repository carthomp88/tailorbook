const mongoose = require('mongoose')
const { Schema, model } = mongoose

const hoursSchema = new Schema({
    name: String,
    sunday: Object,
    monday: Object,
    tuesday: Object,
    wednesday: Object,
    thursday: Object,
    friday: Object,
    saturday: Object
})

const Hours = model('Hours', hoursSchema)
module.exports = Hours