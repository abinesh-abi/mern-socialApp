const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
var logger = require('morgan');
const { PORT } = require('./config/basicConfig')
const mongodbConnection = require('./config/db');
const basicConfig = require('./config/basicConfig');


const app = express()

app.use(express.json());
app.use(logger('dev'));
app.use(cors({
    origin:[...basicConfig.CLIENT_URL],
    credentials: true,
}))
app.use('/images', express.static('uploads'))



// socket
const http = require('http').createServer(app)
const io = require('socket.io')(http,{
    pingTimeout:60000,
    cors:{
        origin:'*',
    }
})
module.exports = {io}

// io.on('connection',(socket)=>{
//     socket.on('setup',userData =>{
//         socket.join(userData._id)
//         console.log(userData._id)
//         socket.emit('connected')
//     })
// })


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", [basicConfig.CLIENT_URL] );
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
app.use('/user/chat',require("./routes/chatRouter"))

http.listen(PORT,()=>console.log('server running on port '+PORT))