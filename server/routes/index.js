const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Landing = require('../models/LandingPage')
const Hours = require('../models/Hours')
const Days = require('../models/Day')

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
        type: req.body.type,
        password: req.body.password
    })

    User.findOne({email: user.email}) //userQ is the query result. if it is null that means the email was not found meaning add it
    .then(userQ => {
        if (userQ) {res.send({})} // if user found return null
        else { // else save the user with this data and send the user object back to the frontend
            user.save()
            res.send(JSON.stringify(user))
        }
    })
})

router.get('/landing', (req, res) => {
    Landing.findOne().then(landingInfo => res.send(JSON.stringify(landingInfo)))
})

router.post('/landing', (req, res) => {
    Landing.updateOne({}, {$set:
        {
            name: req.body.name,
            info: req.body.info,
            email: req.body.email,
            phone: req.body.phone,
            social: req.body.social
        }}).then()
})

router.get('/hours', (req, res) => {
    Hours.findOne().then(hoursInfo => res.send(JSON.stringify(hoursInfo)))
})

router.get('/days', (req, res) => {
    Days.findOne().then(daysInfo => res.send(JSON.stringify(daysInfo)))
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