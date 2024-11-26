var express = require('express');
var router = express.Router();
const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const User = require('../models/User');
const sendEmail = require('../emailService'); // Import email service

// Customer Home Endpoint
router.get('/home', function(req, res) {
    console.log('Customer Home');
    res.send('Welcome to the Customer Home');
});

// Fetch Appointments Endpoint
router.get('/calendar', async (req, res) => {
    Appointment.find()
        .then(appointments => res.send({ array: appointments }))
        .catch(err => res.json(err));
});

// Fetch Services Endpoint
router.get('/services', async (req, res) => {
    Service.find()
        .then(services => res.send({ array: services }))
        .catch(err => res.json(err));
});

// Book Appointment Endpoint
router.post('/book', async (req, res) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phonenum: req.body.phonenum,
        });

        const aptmt = new Appointment({
            date: req.body.date,
            type: req.body.type,
            user: user,
            notes: req.body.notes,
        });

        await user.save();
        await aptmt.save();

        const subject = 'Booking Confirmation';
        const htmlContent = `
            <h1>Booking Confirmation</h1>
            <p>Hi ${req.body.firstName},</p>
            <p>Your booking for ${req.body.type} on ${new Date(req.body.date).toLocaleString()} has been confirmed.</p>
        `;
        await sendEmail(req.body.email, subject, htmlContent);

        res.status(200).send('Booking confirmed and email sent.');
    } catch (error) {
        console.error('Error during booking:', error);
        res.status(500).send('Error during booking.');
    }
});

// Existing customer routes (if any) go here and are preserved

module.exports = router;
