const mongoose = require('mongoose')
const { Schema, model } = mongoose

const appointmentSchema = new Schema({
    date: Date,
    type: String,
    user: Object, //objectID from other collection?
    notes: String
})

const Appointment = model('Appointment', appointmentSchema)
module.exports = Appointment