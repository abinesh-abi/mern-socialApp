const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
var logger = require('morgan');
const { PORT } = require('./config/basicConfig')
const mongodbConnection = require('./config/db')


const app = express()

app.use(express.json());
app.use(logger('dev'));
app.use(cors({
    origin:'http://127.0.0.1:3000',
    credentials: true,
}))
app.use('/images', express.static('uploads'))

// app.use(function(req, res, next) {
//   res.header('Content-Type', 'application/json;charset=UTF-8')
//   res.header('Access-Control-Allow-Credentials', true)
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   )
// next()
// })

app.use(cookieParser());




// mongodb
mongodbConnection()

// router
app.use('/',require("./routes/authRouter"))
app.use('/',require("./routes/userRouter"))
app.use('/',require("./routes/adminRouter"))

app.listen(PORT,()=>console.log('server running on port '+PORT))