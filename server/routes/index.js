const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('absolutely baller man')
})

router.post('/login', (req, res) => {
    console.log('trying to send login to me!')
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