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
    .then(appointments => res.send(JSON.stringify({array: appointments})))
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

router.post('/services', async (req, res) => {
    const service = new Service({
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        daysOffered: req.body.daysOffered
        // add images here when we figure out what that's about!
    })
    Service.findOne({name: service.name}).then(query => {
        if (query) {
            Service.updateOne({ // this means that the service exists and needs updating
            desc: service.desc,
            price: service.price
            // add images here when we figure out what that's about!
            }).then()
        } else service.save() // if it doesn't exist, save to db
    })
})

router.post('/deleteService', async (req, res) => {
    const service = req.body
    Service.deleteOne({name: service[0].name}).then()
})

module.exports = router;
