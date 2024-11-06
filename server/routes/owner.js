var express = require('express');
var router = express.Router();
const Appointment = require('../models/Appointment')
const Service = require('../models/Service')

router.get('/home', function(req, res) {
    console.log('Owner Home')
});

router.get('/calendar', async (req, res) => {
    // Pull all appointments using a Mongo query
    Appointment.find()
    .then(appointments => res.send({array: appointments}))
    .catch(err => res.json(err))
        
    //console.log(appointmentQuery)
    // Generate obj from each apptmt (title, start, end)
    // Add array of obj to res?? Right????????
})

router.get('/services', async (req, res) => {
    Service.find()
    .then(services => res.send({array: services}))
    .catch(err => res.json(err))
})

module.exports = router;
