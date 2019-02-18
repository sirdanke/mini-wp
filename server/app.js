const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const postingRoutes = require('./routes/posting')
const userRoutes = require('./routes/users')
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/mini-wp', {useNewUrlParser: true})


app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())

app.use('/', postingRoutes)
app.use('/users', userRoutes)

app.listen(port, function() {
    console.log('listen to port ',port) 
})
