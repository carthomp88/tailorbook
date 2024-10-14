if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to MongoDB'))

app.post('/', (req, res) => {
    console.log('Received a post request!')
})

app.listen(8080 , () =>{
    console.log('server listening on port 8080')
})