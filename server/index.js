const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.listen(8080 , () =>{
    console.log('server listening on port 8080')
})