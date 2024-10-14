const express = require('express')
const router = express.Router()
const Appointment = require('../models/Appointment')
const User = require('../models/User')

// Create the Appointment in the DB Route
router.post('/', (req, res) => {
    // USE A QUERY TO DRAW AN EXISTING USER FROM A DATABASE
    const userInfo = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email})
    const appointment = new Appointment({
        user: userInfo,
        date: req.body.apptDatetime,
        notes: req.body.notes
    })
    userInfo.save()
    appointment.save()
})
module.exports = router