var express = require('express');
var router = express.Router();
const Appointment = require('../models/Appointment')
const Service = require('../models/Service')
const User = require('../models/User')

router.get('/home', function(req, res) {
    console.log('Customer Home')
});

router.get('/calendar', async (req, res) => {
    // Pull all appointments using a Mongo query
    Appointment.find()
    .then(appointments => res.send({array: appointments}))
    .catch(err => res.json(err))
})

router.get('/services', async (req, res) => {
    Service.find()
    .then(services => res.send({array: services}))
    .catch(err => res.json(err))
})

router.post('/book', (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phonenum: req.body.phonenum
    })
    const aptmt = new Appointment({ 
        date: req.body.date,
        type: req.body.type,
        user: user,
        notes: req.body.notes
    })
    user.save()
    aptmt.save()
})

module.exports = router;
