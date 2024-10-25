const express = require('express')
const router = express.Router()
const User = require('../models/User')

const handleLogin = (user, email, password, type) => {
    if (!user) { 
        //console.log("user not found case")
        return 0
    }
    else if (user.type != type || user.type != 'Both') { 
        //console.log("user exists, wrong type case")
        return 1
    }
    else {
        //console.log("user found, correct type cases")
        if (password === user.password) { 
            //console.log("passwords match case")
            return 2
        }
        else { 
            //console.log("passwords don't match case")
            return 3
        }
    }
    // Do something on success that logs in as the correct type (customer/owner)
    // Will need get request back from login page (?)
}

router.get('/', (req, res) => {
    console.log('absolutely baller man')
})

router.post('/login', (req, res) => {
    console.log(req.body.email)
    const email = req.body.email
    const password = req.body.password
    const type = req.body.type
    /*
    * Check DB for email.
    *   If email, check type.
    *       If types match, check for matching password. ENCRYPTION???
    *           If passwords match, login
    *           If not, prompt error
    *       If type is wrong, prompt to confirm Owner/Customer
    *   If no email, prompt to register
    * 
    * WHAT DO YOU DO TO SAVE LOGGED IN STATE?
    */
    const caseNum = {num: -1}
    User.findOne({email: email}).then(user => caseNum.num = handleLogin(user, email, password, type))
    const caseMsg = {msg: ""}
    switch (caseNum) {
        case 0:
            caseMsg.msg = "Email not registered"
            console.log(caseMsg.msg)
            break;
        case 1:
            caseMsg.msg = "Email not registered as " + type
            console.log(caseMsg.msg)
            break;
        case 2:
            caseMsg.msg = "Success"
            console.log(caseMsg.msg)
            break;
        case 3:
            caseMsg.msg = "Incorrect password"
            console.log(caseMsg.msg)
            break;
        default:
            console.log("hurr durr")
            console.log(caseNum)
    }
    console.log(caseMsg.msg)
    res.send(JSON.stringify(caseMsg));
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