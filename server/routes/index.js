const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', (req, res) => {
    console.log('absolutely baller man')
})

router.post('/login', (req, res) => {
    const email = req.body.email
    User.findOne({email: email}).then(user => res.send(JSON.stringify(user)))
})

router.post('/register', (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phonenum: req.body.phonenum
    })

    User.findOne({email: user.email})
    .then(userQuery => userQuery ? 
        console.log('Email already in use case') : 
        () => {
            console.log('Email is unregistered case')
            user.save()
        })
})

/* 
* ROUTING SCHEME
* Home page: post route for login info. Return user info via get on customer/owner side?? Uhhhh
* Customer Home: Maybe get route that passes back the user from DB?
* Owner Home: Same for owner info? And site info too
* Customer Booking: POST relies on user's info from login, appt info from form
* Owner Schedule: POST with timeslots to block out as unavailable
* PRESUMABLY, there needs to be GET reqs for EVERY SINGLE VISIBLE CALENDAR IN THE APP to populate
* the schedule????
*/

module.exports = router