const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { PORT } = require('./config/basicConfig')
const mongodbConnection = require('./config/db')


const app = express()

app.use(express.json());
app.use(cors())
app.use(cookieParser());

// mongodb
mongodbConnection()

// router
app.use('/',require("./routes/authRouter"))

app.listen(PORT,()=>console.log('server running on port '+PORT))