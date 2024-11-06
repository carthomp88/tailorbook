if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const cors = require('cors')

const express = require('express')
const app = express()

const customerRouter = require('./routes/customer.js')
const ownerRouter = require('./routes/owner.js')
const indexRouter = require('./routes/index.js')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to MongoDB'))

app.use(cors())
app.use(express.json())

app.use('/customer', customerRouter)
app.use('/owner', ownerRouter)
app.use('/', indexRouter)


app.listen(process.env.PORT || 8080, () =>{
    console.log('server listening on port 8080')
})