
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const sendEmail = require('../emailService'); // Import email service

// Create the Appointment in the DB Route
router.post('/', async (req, res) => {
    try {
        const userInfo = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });

        const appointment = new Appointment({
            user: userInfo,
            date: req.body.apptDatetime,
            notes: req.body.notes
        });

        await userInfo.save();
        await appointment.save();

        const subject = 'Appointment Confirmation';
        const htmlContent = `
            <h1>Appointment Confirmation</h1>
            <p>Hi ${req.body.firstName},</p>
            <p>Your appointment on ${new Date(req.body.apptDatetime).toLocaleString()} has been confirmed.</p>
        `;
        await sendEmail(req.body.email, subject, htmlContent);

        //res.status(201).send(JSON.stringify('Appointment confirmed and email sent.'));
    } catch (error) {
        console.error('Error creating appointment:', error);
        //res.status(500).send('Error creating appointment.');
    }
});

module.exports = router;
